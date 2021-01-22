package br.com.pastaeriso.api.purchases.purchase;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import br.com.pastaeriso.api.finances.account.Account;
import br.com.pastaeriso.api.finances.account.AccountRepository;
import br.com.pastaeriso.api.finances.account.AccountType;
import br.com.pastaeriso.api.finances.transaction.TransactionModality;
import br.com.pastaeriso.api.finances.transaction.TransactionType;
import br.com.pastaeriso.api.integrations.nfe.NfeProc;
import br.com.pastaeriso.api.purchases.provider.Provider;
import br.com.pastaeriso.api.purchases.provider.ProviderRepository;
import br.com.pastaeriso.api.purchases.purchase.products.PurchaseProduct;
import br.com.pastaeriso.api.purchases.purchase.products.PurchaseProductRepository;
import br.com.pastaeriso.api.recipeBook.input.Input;
import br.com.pastaeriso.api.recipeBook.unit.Unit;
import br.com.pastaeriso.api.recipeBook.unit.UnitRepository;

@RestController
@CrossOrigin
public class PurchaseController {
	
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private ProviderRepository providerRepository;
	@Autowired
	private UnitRepository unitRepository;
	@Autowired
	private PurchaseProductRepository purchaseProductRepository;

	@SuppressWarnings("rawtypes")
	@PostMapping("/purchases/fromNFe")
	public String postFromNFe (@RequestParam ("nfe") MultipartFile nfeXml) throws IOException, JAXBException {
		
		JAXBContext jaxbContext = JAXBContext.newInstance(NfeProc.class);
		Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
		NfeProc root = (NfeProc) unmarshaller.unmarshal(nfeXml.getInputStream());
		NfeProc.Proc proc = (NfeProc.Proc) ( (javax.xml.bind.JAXBElement) root.getContent().get(4)).getValue();
		
		ObjectMapper mapper = new ObjectMapper();
		ObjectNode purchase = mapper.createObjectNode();
		// Provider
		String providerCnpj = proc.getNfeProc().getNFe().getInfNFe().getEmit().getCNPJ();
		String providerName = ""; 
		String providerComment = proc.getNfeProc().getNFe().getInfNFe().getEmit().getXNome() + " + " + proc.getNfeProc().getNFe().getInfNFe().getEmit().getXFant();// razao social + nome fantasia do emitente 
		
		Provider providerObject = providerRepository.findByCnpj(providerCnpj);
		if(providerObject != null) {
			providerName = providerObject.getName();
			providerComment = providerObject.getComment();
		}
		ObjectNode provider = mapper.createObjectNode()
				.put("cnpj",providerCnpj)
				.put("name",providerName)
				.put("comment", providerComment);
		
		// Data de emissão
		// Formato: 2020-09-10T10:57:09-03:00
		OffsetDateTime made = OffsetDateTime.parse(proc.getNfeProc().getNFe().getInfNFe().getIde().getDhEmi(), DateTimeFormatter.ISO_OFFSET_DATE_TIME);	
		
		// NFe
		//NFeXml nfe = new NFeXml(proc.getNfeProc().getProtNFe().getInfProt().getChNFe(),new String (nfeXml.getBytes()));
		ObjectNode nfe = mapper.createObjectNode()
				.put("accessCode", proc.getNfeProc().getProtNFe().getInfProt().getChNFe());
		// value
		BigDecimal value = new BigDecimal(proc.getNfeProc().getNFe().getInfNFe().getTotal().getICMSTot().getVNF());
		
		// Transaction
		int tipoDePagamento = Integer.parseInt(proc.getNfeProc().getNFe().getInfNFe().getPag().getDetPag().getTPag());
		ObjectNode account = mapper.createObjectNode();
		String modality = TransactionModality.CASH.toString();
		AccountType accountType = AccountType.CASH_ACCOUNT;
		
		switch(tipoDePagamento) {
			case 01: // dinheiro
				modality = TransactionModality.CASH.toString();
				accountType = AccountType.CASH_ACCOUNT;
			break;
			case 03: // cartao de credito
				modality = TransactionModality.CREDIT_CARD.toString();
				accountType = AccountType.CREDIT_CARD;
			break;
			case 04: // cartaod de debito
				modality = TransactionModality.DEBIT_CARD.toString();
				accountType = AccountType.BANK_ACCOUNT;
			break;
		}
		account = account.put("type",accountType.toString());
		Optional<Account> theAccount = accountRepository.findFavoriteByType(accountType);
		if(theAccount.isPresent()) {
			account = account.put("name", theAccount.get().getName());
		}
		ObjectNode transaction = ((ObjectNode)mapper.createObjectNode()
				.set("account",account))
				.put("value",value.toString())
				.put("date",made.toLocalDate().toString())
				.put("modality",modality)
				.put("type",TransactionType.PURCHASE.toString());
	
		// ITEMS
		ArrayNode items = mapper.createArrayNode();
		BigDecimal subtotal = new BigDecimal(0);
		for(NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det det : proc.getNfeProc().getNFe().getInfNFe().getDet()) {
			// INPUT
			String brand = null;
			String inputAsString = det.getProd().getXProd();
			List<PurchaseProduct> purchaseProduct = purchaseProductRepository.findByProductNameIgnoreCase(inputAsString);
			
			ObjectNode input = mapper.createObjectNode().put("name", "");
			if(!purchaseProduct.isEmpty()) {
				Input theInput = purchaseProduct.get(0).getInput();
				input = input
						.put("name", theInput.getName())
						.put("comment", theInput.getComment());
				brand = purchaseProduct.get(0).getBrand();
			}
			
			// quantidades e precos
			BigDecimal quantity = new BigDecimal(det.getProd().getQCom());
			BigDecimal pricePerUnit = new BigDecimal(det.getProd().getVUnCom());
			//date = made
			subtotal = subtotal.add(quantity.multiply(pricePerUnit));
			
			// UNIT
			String unitAsString = det.getProd().getUCom();
			Unit theUnit = unitRepository.findByNameIgnoreCase(unitAsString);
			if(theUnit == null) {
				theUnit = unitRepository.findByNameIgnoreCase("UN");
			}
			ObjectNode unit = mapper.createObjectNode()
					.put("name",theUnit.getName())
					.put("quantity",theUnit.getQuantity().toString());
			ObjectNode inventoryMovement = ( (ObjectNode)mapper.createObjectNode()
					.put("date",made.toLocalDate().toString())
					.put("quantity",quantity)
					.set("unit",unit))
					.set("input",input);
			
			items.add(
					(
							(ObjectNode)mapper.createObjectNode()
							.put("brand",brand)
							.put("description", inputAsString + " (" + unitAsString + ")")
							.put("pricePerUnit",pricePerUnit)
							.set("unit",unit)
					)
					.set("inventoryMovement", inventoryMovement));
		}

		purchase = purchase.put("additionalValue", value.subtract(subtotal));
		purchase = (ObjectNode) purchase.set("items", items);
		
		
		purchase = ((ObjectNode) ( (ObjectNode)purchase
				.set("provider",provider))
				.set("nfe",nfe))
				.set("transaction",transaction);
		return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(purchase);
	}

}
