package br.com.pastaeriso.api.purchases.purchase;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.pastaeriso.api.finances.account.Account;
import br.com.pastaeriso.api.finances.account.AccountRepository;
import br.com.pastaeriso.api.finances.account.AccountType;
import br.com.pastaeriso.api.finances.transaction.Transaction;
import br.com.pastaeriso.api.finances.transaction.TransactionModality;
import br.com.pastaeriso.api.finances.transaction.TransactionType;
import br.com.pastaeriso.api.integrations.nfe.NfeProc;
import br.com.pastaeriso.api.purchases.inventory.InventoryMovement;
import br.com.pastaeriso.api.purchases.provider.Provider;
import br.com.pastaeriso.api.purchases.provider.ProviderRepository;
import br.com.pastaeriso.api.purchases.purchase.items.PurchaseItem;
import br.com.pastaeriso.api.purchases.purchase.nfe.NFeXml;
import br.com.pastaeriso.api.purchases.purchase.products.PurchaseProduct;
import br.com.pastaeriso.api.purchases.purchase.products.PurchaseProductRepository;
import br.com.pastaeriso.api.recipeBook.input.Input;
import br.com.pastaeriso.api.recipeBook.unit.Quantity;
import br.com.pastaeriso.api.recipeBook.unit.Unit;
import br.com.pastaeriso.api.recipeBook.unit.UnitRepository;

@RestController
@CrossOrigin
public class PurchaseController {
	
	@Autowired
	private ProviderRepository providerRepository;
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private UnitRepository unitRepository;
	@Autowired
	private PurchaseProductRepository purchaseProductRepository;

	@SuppressWarnings("rawtypes")
	@PostMapping("/purchases/fromNFe")
	public Purchase postFromNFe (@RequestParam ("nfe") MultipartFile nfeXml) throws IOException, JAXBException {
		JAXBContext jaxbContext = JAXBContext.newInstance(NfeProc.class);
		Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
		NfeProc root = (NfeProc) unmarshaller.unmarshal(nfeXml.getInputStream());
		NfeProc.Proc proc = (NfeProc.Proc) ( (javax.xml.bind.JAXBElement) root.getContent().get(4)).getValue();
		
		// Provider
		String providerCnpj = proc.getNfeProc().getNFe().getInfNFe().getEmit().getCNPJ();
		Provider provider = providerRepository.findByCnpj(providerCnpj);
		if(provider == null) {
			String providerName = proc.getNfeProc().getNFe().getInfNFe().getEmit().getXNome() + " + " + proc.getNfeProc().getNFe().getInfNFe().getEmit().getXFant();// razao social + nome fantasia do emitente
			provider = Provider.builder().name(providerName).cnpj(providerCnpj).build();
		}
		
		// Data de emissão
		// Formato: 2020-09-10T10:57:09-03:00
		OffsetDateTime made = OffsetDateTime.parse(proc.getNfeProc().getNFe().getInfNFe().getIde().getDhEmi(), DateTimeFormatter.ISO_OFFSET_DATE_TIME);	
		
		// NFe
		NFeXml nfe = new NFeXml(proc.getNfeProc().getProtNFe().getInfProt().getChNFe(),new String (nfeXml.getBytes()));
		
		// value
		String valueAsString = proc.getNfeProc().getNFe().getInfNFe().getPag().getDetPag().getVPag();
		//System.out.println("value as string: " + valueAsString);
		//String [] valueAsStringParts = valueAsString.split("\\.");
		//System.out.println(Arrays.toString(valueAsStringParts));
		//valueAsString = valueAsStringParts[0] + "," + valueAsStringParts[1];
		BigDecimal value = new BigDecimal(valueAsString);
		
		// Transaction
		int tipoDePagamento = Integer.parseInt(proc.getNfeProc().getNFe().getInfNFe().getPag().getDetPag().getTPag());
		Account account = null;
		TransactionModality modality = TransactionModality.CASH;
		
		switch(tipoDePagamento) {
			case 01: // dinheiro
				account = accountRepository.findFavoriteByType(AccountType.CASH_ACCOUNT);
			break;
			case 03: // cartao de credito
				account = accountRepository.findFavoriteByType(AccountType.CREDIT_CARD);
				modality = TransactionModality.CREDIT_CARD;
			break;
			case 04: // cartaod de debito
				account = accountRepository.findFavoriteByType(AccountType.BANK_ACCOUNT);
				modality = TransactionModality.DEBIT_CARD;
			break;
			default:
				account = accountRepository.findFavoriteByType(AccountType.CASH_ACCOUNT);
		}
		if(account == null) {
			account = new Account("Caixa",AccountType.CASH_ACCOUNT);
			account = accountRepository.save(account);
		}
		Transaction transaction = Transaction.builder()
				.account(account)
				.value(value)
				.date(made.toLocalDate())
				.modality(modality)
				.type(TransactionType.PURCHASE)
				.build();
	
		// ITEMS
		List<PurchaseItem> items = new LinkedList<>();
		List<String> nonIdentifiedProducts = new LinkedList<>();
		for(NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det det : proc.getNfeProc().getNFe().getInfNFe().getDet()) {
			// INPUT
			String brand = null;
			String inputAsString = det.getProd().getXProd();
			List<PurchaseProduct> purchaseProduct = purchaseProductRepository.findByProductNameIgnoreCase(inputAsString);
			Input input;
			if(!purchaseProduct.isEmpty()) {
				input = purchaseProduct.get(0).getInput();
				brand = purchaseProduct.get(0).getBrand();
			} else {
				nonIdentifiedProducts.add(inputAsString);
				continue; // TODO salvar o trabalho 
			}
			
			// quantidades e precos
			BigDecimal quantity = new BigDecimal(det.getProd().getQCom());
			BigDecimal pricePerUnit = new BigDecimal(det.getProd().getVUnCom());
			//date = made
			
			// UNIT
			String unitAsString = det.getProd().getUCom();
			Unit unit = unitRepository.findByNameIgnoreCase(unitAsString);
			if(unit == null) {
				unit = unitRepository.save(new Unit(unitAsString,Quantity.NON_CONVERTIBLE));
			}
			
			items.add(PurchaseItem
					.builder()
					.brand(brand)
					.pricePerUnit(pricePerUnit)
					.unit(unit)
					.inventoryMovement(InventoryMovement.builder()
							.quantity(quantity)
							.unit(unit)
							.input(input)
							.date(made.toLocalDate())
							.build())
					.build());
		}
		
		
		Purchase purchase = Purchase
				.builder()
				.provider(provider)
				.nfe(nfe)
				.transaction(transaction)
				.items(items)
				.build();
		return purchase;
	}

}
