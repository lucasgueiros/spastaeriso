/* 
 * The MIT License
 *
 * Copyright 2021 Lucas Dantas Gueiros.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
package br.com.pastaeriso.api.purchases.purchase;

import br.com.pastaeriso.accounting.account.Account;
import br.com.pastaeriso.accounting.card.Card;
import br.com.pastaeriso.accounting.transaction.Entry;
import br.com.pastaeriso.accounting.transaction.GenericTransaction;
import br.com.pastaeriso.accounting.transaction.modality.TransactionModality;
import br.com.pastaeriso.api.accounting.account.AccountRepository;
import br.com.pastaeriso.api.accounting.card.CardRepository;
import br.com.pastaeriso.api.accounting.entry.EntryRepository;
import br.com.pastaeriso.api.accounting.transaction.TransactionModalityRepository;
import br.com.pastaeriso.api.integrations.nfe.NfeProc;
import br.com.pastaeriso.api.purchases.provider.ProviderRepository;
import br.com.pastaeriso.api.purchases.purchase.items.PurchaseItemRepository;
import br.com.pastaeriso.api.purchases.purchase.nfce.NfceController;
import br.com.pastaeriso.api.purchases.purchase.products.PurchaseProductRepository;
import br.com.pastaeriso.api.recipeBook.input.InputRepository;
import br.com.pastaeriso.api.recipeBook.unit.UnitRepository;
import br.com.pastaeriso.purchases.provider.Provider;
import br.com.pastaeriso.purchases.purchase.Purchase;
import br.com.pastaeriso.purchases.purchase.items.PurchaseItem;
import br.com.pastaeriso.purchases.purchase.products.PurchaseProduct;
import br.com.pastaeriso.recipeBook.input.Input;
import br.com.pastaeriso.recipeBook.unit.Unit;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.hateoas.server.EntityLinks;
import org.springframework.hateoas.server.LinkBuilder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import br.com.pastaeriso.api.accounting.transaction.GenericTransactionRepository;
import br.com.pastaeriso.api.purchases.inventory.InventoryMovementRepository;
import java.time.LocalDateTime;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author lucas
 */
@RestController
@CrossOrigin
@RequestMapping
public class PurchaseController {

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private ProviderRepository providerRepository;
    @Autowired
    private UnitRepository unitRepository;
    @Autowired
    private PurchaseProductRepository purchaseProductRepository;
    @Autowired
    private InputRepository inputRepository;
    @Autowired
    private GenericTransactionRepository genericTransactionRepository;
    @Autowired
    private TransactionModalityRepository transactionModalityRepository;
    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private PurchaseItemRepository purchaseItemRepository;
    @Autowired @Lazy
    private PurchaseRepository repository;
    @Autowired
    private EntryRepository entryRepository;
    @Autowired
    private NfceController nfceController;
    @Autowired
    private EntityLinks entityLinks;
    @Autowired
    private InventoryMovementRepository inventoryMovementRepository;
    
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/purchases/nfce")
    public ResponseEntity nfce(@RequestParam("nfce") final MultipartFile nfce) throws JAXBException, IOException {
        Purchase purchase = parseNfce(nfce);
        purchase = repository.save(purchase);
        HttpHeaders headers = new HttpHeaders();
        URI location = entityLinks.linkForItemResource(Purchase.class, purchase.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    private Purchase parseNfce(MultipartFile multipartFile) throws IOException, JAXBException {
        JAXBContext jaxbContext = JAXBContext.newInstance(NfeProc.class);
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        NfeProc root = (NfeProc) unmarshaller.unmarshal(multipartFile.getInputStream());
        NfeProc.Proc proc = (NfeProc.Proc) ((javax.xml.bind.JAXBElement) root.getContent().get(4)).getValue();

        Purchase.PurchaseBuilder purchase = Purchase.builder();

        // Valor total
        BigDecimal value = new BigDecimal(proc.getNfeProc().getNFe().getInfNFe().getTotal().getICMSTot().getVNF());
        
        // SUPER (TRANSACTION)
        String description = "";
        // MODALITY
        int indPag = Integer.parseInt(proc.getNfeProc().getNFe().getInfNFe().getPag().getDetPag().getIndPag());
        int tipoDePagamento = Integer.parseInt(proc.getNfeProc().getNFe().getInfNFe().getPag().getDetPag().getTPag());
        // Conseguindo a modalidade da transação
        String modalityName = "Espécie";
        Account account = null;
        switch (tipoDePagamento) {
            case 01: // dinheiro
                modalityName = "Espécie";
                account  = accountRepository.findByNameIgnoreCase("Caixa").get();
                break;
            case 02: // cheque
                modalityName = "Cheque";
            case 03: // cartao de credito
                if(indPag == 0) {
                    modalityName = "Cartão de crédito (à vista)";
                } else {
                    modalityName = "Cartão de crédito (à prazo)";
                }
                String cardCNPJ = proc.getNfeProc().getNFe().getInfNFe().getPag().getDetPag().getCard().getCNPJ();
                Optional<Card> optionalCard = cardRepository.findFavoriteByCnpj(cardCNPJ);
                if(optionalCard.isPresent()){
                    account = optionalCard.get().getAccount();
                } else {
                    String bandeira = null;
                    switch(Integer.parseInt(proc.getNfeProc().getNFe().getInfNFe().getPag().getDetPag().getCard().getTBand())){
                        // Bandeira da operadora de cartão de crédito/débito:01–Visa; 02–Mastercard; 03–American Express; 04–Sorocred;05-Diners Club;06-Elo;07-Hipercard;08-Aura;09-Cabal;99–Outros
                        case 0:
                            bandeira = "Visa";
                            break;
                        case 1:
                            bandeira = "Mastercard";
                            break;
                        case 2:
                            bandeira = "American Express";
                            break;
                        case 3:
                            bandeira = "Sorocred";
                            break;
                        case 4:
                            bandeira = "Diners Club";
                            break;
                        case 5:
                            bandeira = "Elo";
                            break;
                        case 6:
                            bandeira = "Hipercard";
                            break;
                        case 7:
                            bandeira = "Hipercard";
                            break;
                        case 8:
                            bandeira = "Aura";
                            break;
                        case 9:
                            bandeira = "Cabal";
                            break;
                    }
                    if(bandeira == null) {
                        description += "Bandeira de cartão desconhecida";
                    } else {
                        account = new Account("Cartão de crédito " + bandeira + " desconhecido");
                        account = accountRepository.save(account);
                        Card card = Card.builder().account(account).cnpj(cardCNPJ).favorite(true).build();
                        cardRepository.save(card);
                    }
                }
                break;
            case 04: // cartaod de debito
                modalityName = "Cartão de débito";
                break;
            case 05: 
                modalityName = "Crédito loja";
                break;
            case 15:
                modalityName = "Boleto bancário";
                break;
        }
        TransactionModality modality = transactionModalityRepository.findByName(modalityName).get();
        
        if(account == null) { // ainda não achou?
            account = modality.getFavorite();
            if(account == null) { // não tem?
                account = accountRepository.findByNameIgnoreCase("Desconhecida").get();
            }
        }
        
        // Cria por padrão duas entries
        LocalDateTime made = LocalDateTime.parse(proc.getNfeProc().getNFe().getInfNFe().getIde().getDhEmi().subSequence(0, 19));
        Entry entry1 = Entry.builder()
                .value(value)
                .account(accountRepository.findByNameIgnoreCase("Compras").get())
                .build();
        Entry entry2 = Entry.builder()
                .value(value.negate())
                .account(account)
                .build();
        GenericTransaction transaction = GenericTransaction.builder()
                .modality(modality)
                .date(made)
                .entry(entryRepository.save(entry1))
                .entry(entryRepository.save(entry2))
                .description(description)
                .build();
        transaction = genericTransactionRepository.save(transaction);
        purchase.transaction(transaction);
        
        // PROVIDER
        purchase.provider(parseProvider(proc.getNfeProc().getNFe().getInfNFe().getEmit()));

        // NFCE
        purchase.nfce(nfceController.save(multipartFile));
        
        // ITEMS
        BigDecimal subtotal = new BigDecimal(0);
        for (NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det det : proc.getNfeProc().getNFe().getInfNFe().getDet()) {
            PurchaseItem item = parseItem(det, made);
            subtotal = subtotal.add(item.getPricePerUnit().multiply(item.getInventoryMovement().getQuantity()));
            purchase.item(item);
        }
        // VALOR EXTRA
        BigDecimal additionalValue = value.subtract(subtotal);
        purchase.additionalValue(additionalValue);
        
        return purchase.build();
    }
    
    private Provider parseProvider(NfeProc.Proc.SubNfeProc.NFe.InfNFe.Emit emit) {
        String cnpj = emit.getCNPJ();
        Optional<Provider> provider = providerRepository.findByCnpj(cnpj);
        if(provider.isPresent()) {
            return provider.get();
        } else {
            Provider.ProviderBuilder providerBuilder = Provider.builder();
            providerBuilder.cnpj(cnpj);
            providerBuilder.name(emit.getXFant() + " (" + cnpj+ ")");
            providerBuilder.comment(emit.getXNome());
            return providerRepository.save(providerBuilder.build());
        }
    }

    
    private PurchaseItem parseItem(NfeProc.Proc.SubNfeProc.NFe.InfNFe.Det det, LocalDateTime made) {
        // INPUT
        
        String brand = null;
        BigDecimal quantity = new BigDecimal(det.getProd().getQCom());
        BigDecimal pricePerUnit = new BigDecimal(det.getProd().getVUnCom());
        Input theInput = null;
        Unit theUnit = null;
        
        
        String unitAsString = det.getProd().getUCom();
        String inputAsString = det.getProd().getXProd();
        String comment = inputAsString + " (" + unitAsString + ")";
        
        List<PurchaseProduct> purchaseProducts = purchaseProductRepository.findByDeclaredInputAndDeclaredUnitIgnoreCase(inputAsString, unitAsString);
        PurchaseProduct purchaseProduct = null;
        if (purchaseProducts.isEmpty()) {
            theUnit = unitRepository.findByNameIgnoreCase(unitAsString);
            if(theUnit == null) {
                theUnit = unitRepository.findByNameIgnoreCase("UN");
            }
            
            purchaseProduct = PurchaseProduct.builder()
                    .brand("Desconhecida")
                    .declaredInput(inputAsString)
                    .declaredUnit(unitAsString)
                    .input(inputRepository.findByName("Desconhecido"))
                    .unit(theUnit)
                    .ratio(BigDecimal.ONE)
                    .keepUnit(true)
                    .build();
            purchaseProduct = purchaseProductRepository.save(purchaseProduct);
        } else {
            purchaseProduct = purchaseProducts.get(0);
            comment = "";
        }
        
        theInput = purchaseProduct.getInput();
        brand = purchaseProduct.getBrand();
        theUnit = purchaseProduct.getUnit();
        
        PurchaseItem purchaseItem = purchaseProduct.toPurchaseItem(made, quantity, pricePerUnit);
        purchaseItem.setInventoryMovement(inventoryMovementRepository.save(purchaseItem.getInventoryMovement()));
        purchaseItem = purchaseItemRepository.save(purchaseItem);
        return purchaseItem;
    }
    
}
