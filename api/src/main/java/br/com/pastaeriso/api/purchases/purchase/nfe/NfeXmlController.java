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
import br.com.pastaeriso.accounting.transaction.Transaction;
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
import br.com.pastaeriso.purchases.purchase.Purchase;
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
import org.springframework.hateoas.Link;

@RestController
@CrossOrigin
@RequestMapping(produces = "application/hal+json")
public class NfeXmlController {

    @Autowired
    private NFeXmlRepository repository;

    @PostMapping("/nFeXmls/fromXml")
    public ResponseEntity<NFeXml> postNfeFromXml(@RequestParam("nfeXml") final MultipartFile nfeXml) throws JAXBException, IOException {
        return new ResponseEntity<>(save(nfeXml), HttpStatus.CREATED);
    }
    
    public NFeXml save(MultipartFile nfeXml) throws JAXBException, IOException {
        JAXBContext jaxbContext = JAXBContext.newInstance(NfeProc.class);
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        NfeProc root = (NfeProc) unmarshaller.unmarshal(nfeXml.getInputStream());
        NfeProc.Proc proc = (NfeProc.Proc) ((javax.xml.bind.JAXBElement) root.getContent().get(4)).getValue();

        String accessCode = proc.getNfeProc().getProtNFe().getInfProt().getChNFe();
        byte[] xml = nfeXml.getBytes();
        NFeXml nfe = NFeXml.builder().accessCode(accessCode).xml(xml).build();
        return repository.save(nfe);
    }

}
