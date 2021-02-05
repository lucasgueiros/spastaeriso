package br.com.pastaeriso.api.purchases.purchase.nfe;

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
import org.springframework.hateoas.server.EntityLinks;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import br.com.pastaeriso.accounting.account.Account;
import br.com.pastaeriso.api.accounting.account.AccountRepository;
import br.com.pastaeriso.accounting.transaction.modality.TransactionModality;
import br.com.pastaeriso.api.accounting.transaction.modality.TransactionModalityRepository;
import br.com.pastaeriso.api.integrations.nfe.NfeProc;
import br.com.pastaeriso.api.purchases.provider.ProviderRepository;
import br.com.pastaeriso.purchases.purchase.products.PurchaseProduct;
import br.com.pastaeriso.api.purchases.purchase.products.PurchaseProductRepository;
import br.com.pastaeriso.recipeBook.input.Input;
import br.com.pastaeriso.api.recipeBook.input.InputRepository;
import br.com.pastaeriso.recipeBook.unit.Unit;
import br.com.pastaeriso.api.recipeBook.unit.UnitRepository;
import br.com.pastaeriso.purchases.provider.Provider;
import br.com.pastaeriso.purchases.purchase.nfe.NFeXml;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

@RestController
@CrossOrigin
@RequestMapping(produces = "application/hal+json")
public class NfeXmlController {

	@Autowired
	private NFeXmlRepository repository;
	@PostMapping("/nFeXmls/fromXml")
	public ResponseEntity<NFeXml> postNfeFromXml(@RequestParam ("nfeXml") final MultipartFile nfeXml) throws JAXBException, IOException {
		// processando o xml
		JAXBContext jaxbContext = JAXBContext.newInstance(NfeProc.class);
		Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
		NfeProc root = (NfeProc) unmarshaller.unmarshal(nfeXml.getInputStream());
		NfeProc.Proc proc = (NfeProc.Proc) ( (javax.xml.bind.JAXBElement) root.getContent().get(4)).getValue();
		
		
		String accessCode = proc.getNfeProc().getProtNFe().getInfProt().getChNFe();
		byte [] xml = nfeXml.getBytes(); 
		NFeXml nfe = NFeXml.builder().accessCode(accessCode).xml(xml).build();
		
		return new ResponseEntity<>(repository.save(nfe), HttpStatus.CREATED);
	}
	
	@GetMapping("/nFeXmls/getXml")
	public byte[] getXml(@RequestParam("accessCode") String accessCode) {
		Optional<NFeXml> nfe = repository.findByAccessCode(accessCode);
		if(nfe.isEmpty()) return new byte[0];
		return nfe.get().getXml();
	}
	
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private ProviderRepository providerRepository;
	@Autowired
	private UnitRepository unitRepository;
	@Autowired
	private PurchaseProductRepository purchaseProductRepository;
	@Autowired
	private EntityLinks entityLinks;
	@Autowired
	private InputRepository inputRepository;
	@Autowired
	private TransactionModalityRepository transactionModalityRepository;


	@SuppressWarnings("rawtypes")
	@PostMapping("/nFeXmls/fromNFe")
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
		
		ObjectNode transactionLinks = mapper.createObjectNode();
		
		// Conseguindo a modalidade da transação
		String modalityName = "Espécie";
		switch(tipoDePagamento) {
			case 01: // dinheiro
				modalityName = "Espécie";
			break;
			case 03: // cartao de credito
				modalityName = "Cartão de crédito";
			break;
			case 04: // cartaod de debito
				modalityName = "Cartão de débito";
			break;
		}
		TransactionModality theModality = null;
		Optional<TransactionModality> optionalModality = transactionModalityRepository.findByName(modalityName);
		if(optionalModality.isEmpty()) {
			TransactionModality newTransactionModality = new TransactionModality(modalityName);
			theModality = transactionModalityRepository.save(newTransactionModality);
		} else {
			theModality = optionalModality.get();
		}
		String modalityUri = entityLinks.linkToItemResource(TransactionModality.class, theModality.getId()).getHref();
		ObjectNode modalityLink = mapper.createObjectNode();
		modalityLink.put("href",modalityUri);
		transactionLinks.set("modality", modalityLink);
		
		ObjectNode account = mapper.createObjectNode();
		String accountName = "caixa";
		Optional<Account> theAccount = accountRepository.findByNameIgnoreCase(accountName);
		if(theAccount.isPresent()) {
			account = account.put("name", theAccount.get().getName());
		}
		ObjectNode transaction = ((ObjectNode)mapper.createObjectNode()
				.set("links",transactionLinks))
				.put("value",value.toString())
				.put("date",made.toLocalDate().toString());
	
		// ITEMS
		ArrayNode items = mapper.createArrayNode();
		BigDecimal subtotal = new BigDecimal(0);
		for(NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det det : proc.getNfeProc().getNFe().getInfNFe().getDet()) {
			// INPUT
			String brand = null;
			String inputAsString = det.getProd().getXProd();
			List<PurchaseProduct> purchaseProduct = purchaseProductRepository.findByProductNameIgnoreCase(inputAsString);
			Input theInput = null;
			if(!purchaseProduct.isEmpty()) {
				theInput = purchaseProduct.get(0).getInput();
				brand = purchaseProduct.get(0).getBrand();
			} else {
				theInput = this.inputRepository.findByName("?");
			}
			String inputLink = entityLinks.linkToItemResource(Input.class, theInput.getId()).getHref();
			
			
			
			// quantidades e precos
			BigDecimal quantity = new BigDecimal(det.getProd().getQCom());
			BigDecimal pricePerUnit = new BigDecimal(det.getProd().getVUnCom());
			//date = made
			//subtotal = subtotal.add(quantity.multiply(pricePerUnit));
			
			// UNIT
			String unitAsString = det.getProd().getUCom();
			Unit theUnit = unitRepository.findByNameIgnoreCase(unitAsString);
			if(theUnit == null) {
				theUnit = unitRepository.findByNameIgnoreCase("UN");
			}
			//ObjectNode unit = mapper.createObjectNode().put("href", );
                        String unitLink = entityLinks.linkToItemResource(Unit.class, theUnit.getId()).getHref();
			//links.set("unit", unit);
			//		.put("name",theUnit.getName())
			//		.put("quantity",theUnit.getQuantity().toString());
			
			
                        ObjectNode item = ( (ObjectNode)mapper.createObjectNode()
                            .put("date",made.toLocalDate().toString())
                            .put("quantity",quantity)
                            .put("unit", unitLink)
                            .put("brand",brand)
                            .put("comment", inputAsString + " (" + unitAsString + ")")
                            .put("pricePerUnit",pricePerUnit)
                            .put("input",inputLink));
			
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
