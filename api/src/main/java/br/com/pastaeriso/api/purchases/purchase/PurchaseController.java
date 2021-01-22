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
import org.springframework.hateoas.server.EntityLinks;
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
import br.com.pastaeriso.api.recipeBook.item.Item;
import br.com.pastaeriso.api.recipeBook.unit.Unit;
import br.com.pastaeriso.api.recipeBook.unit.UnitRepository;

@RestController
@CrossOrigin
public class PurchaseController {
	
	

}
