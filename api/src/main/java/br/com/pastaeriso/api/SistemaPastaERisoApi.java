package br.com.pastaeriso.api;

import br.com.pastaeriso.accounting.account.Account;
import br.com.pastaeriso.accounting.entry.Entry;
import br.com.pastaeriso.accounting.transaction.Transaction;
import br.com.pastaeriso.accounting.transaction.modality.TransactionModality;
import br.com.pastaeriso.accounting.transaction.type.TransactionType;
import br.com.pastaeriso.api.accounting.account.AccountRepository;
import br.com.pastaeriso.api.accounting.entry.EntryRepository;
import br.com.pastaeriso.api.accounting.transaction.TransactionRepository;
import br.com.pastaeriso.api.accounting.transaction.modality.TransactionModalityRepository;
import br.com.pastaeriso.api.accounting.transaction.type.TransactionTypeRepository;
import br.com.pastaeriso.api.people.address.type.AddressTypeRepository;
import br.com.pastaeriso.api.people.contact.channel.ContactChannelRepository;
import br.com.pastaeriso.api.purchases.provider.ProviderRepository;
import br.com.pastaeriso.api.purchases.purchase.PurchaseRepository;
import br.com.pastaeriso.api.purchases.purchase.items.PurchaseItemRepository;
import br.com.pastaeriso.api.recipeBook.input.InputRepository;
import br.com.pastaeriso.api.recipeBook.unit.UnitRepository;
import br.com.pastaeriso.purchases.provider.Provider;
import br.com.pastaeriso.purchases.purchase.Purchase;
import br.com.pastaeriso.purchases.purchase.items.PurchaseItem;
import br.com.pastaeriso.recipeBook.input.Input;
import br.com.pastaeriso.recipeBook.unit.Quantity;
import br.com.pastaeriso.recipeBook.unit.Unit;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Month;
import java.util.LinkedList;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EnableAutoConfiguration
@EntityScan("br.com.pastaeriso")
public class SistemaPastaERisoApi {

	public static void main(String[] args) {
		SpringApplication.run(SistemaPastaERisoApi.class, args);
	}
        
        @Autowired
        private UnitRepository unitRepository;
        @Autowired
        private InputRepository inputRepository;
        @Autowired
        private AccountRepository accountRepository;
        @Autowired
        private TransactionModalityRepository transactionModalityRepository;
        @Autowired
        private TransactionTypeRepository transactionTypeRepository;
        @Autowired
        private ContactChannelRepository contactChannelRepository;
        @Autowired
        private AddressTypeRepository addressTypeRepository;
        @Autowired
        private TransactionRepository transactionRepository;
        @Autowired
        private EntryRepository entryRepository;
        @Autowired
        private PurchaseItemRepository purchaseItemRepository;
        @Autowired
        private ProviderRepository providerRepository;
        
        @Autowired
        private PurchaseRepository purchaseRepository;
        @PostConstruct
        public void insertToDatabase() {
            // BASIC DATA
            Unit unit1 = this.unitRepository.save(new Unit("kg", Quantity.WEIGHT));
            Unit unit2 = this.unitRepository.save(new Unit("L", Quantity.VOLUME));
            Unit unit3 = this.unitRepository.save(new Unit("mL", Quantity.VOLUME));
            Unit unit4 = this.unitRepository.save(new Unit("UNI", Quantity.NON_CONVERTIBLE));
            
            Input input1 = this.inputRepository.save(new Input("Tomate"));
            Input input2 = this.inputRepository.save(new Input("Cebola"));
            Input input3 = this.inputRepository.save(new Input("Farinha de trigo"));
            
            Account account1 = this.accountRepository.save(new Account("Compras"));
            Account account2 = this.accountRepository.save(new Account("Caixa"));
            Account account3 = this.accountRepository.save(new Account("Pedidos"));
            
            TransactionModality transactionModality1 = this.transactionModalityRepository.save(new TransactionModality("A vista"));
            TransactionModality transactionModality2 = this.transactionModalityRepository.save(new TransactionModality("A prazo"));
            
            TransactionType transactionType1 = this.transactionTypeRepository.save(new TransactionType("Compra"));
            TransactionType transactionType2 = this.transactionTypeRepository.save(new TransactionType("Pedido"));
            
            // EXEMPLE DATA
            Entry entry1 = this.entryRepository.save(Entry.builder().account(account1).value(new BigDecimal(10)).build());
            Entry entry2 = this.entryRepository.save(Entry.builder()
                    .account(account2)
                    .value(new BigDecimal(-10)).build());
            Entry entry3 = this.entryRepository.save(Entry.builder().account(account3).value(new BigDecimal(20)).build());
            Entry entry4 = this.entryRepository.save(Entry.builder().account(account1).value(new BigDecimal(-20)).build());
            Entry entry5 = this.entryRepository.save(Entry.builder().account(account3).value(new BigDecimal(30)).build());
            Entry entry6 = this.entryRepository.save(Entry.builder().account(account2).value(new BigDecimal(-30)).build());
            
            Transaction transaction1 = this.transactionRepository.save(
                    Transaction.builder()
                            .date(LocalDate.of(2020, Month.DECEMBER, 23))
                            .modality(transactionModality2)
                            .type(transactionType2)
                            .entry(entry1)
                            .entry(entry2)
                            .description("Alguma transação")
                            .build());
            Transaction transaction2 = this.transactionRepository.save(
                    Transaction.builder()
                            .date(LocalDate.of(2020, Month.MARCH, 3))
                            .modality(transactionModality1)
                            .type(transactionType1)
                            .entry(entry3)
                            .entry(entry4)
                            .description("Outra transação")
                            .build());
            Transaction transaction3 = this.transactionRepository.save(
                    Transaction.builder()
                            .date(LocalDate.of(2021, Month.JULY, 4))
                            .modality(transactionModality1)
                            .type(transactionType2)
                            .entry(entry5)
                            .entry(entry6)
                            .description("Ainda outra transação")
                            .build());
            PurchaseItem purchaseItem1 = this.purchaseItemRepository.save(PurchaseItem.builder()
                    .input(input1)
                    .unit(unit1)
                    .quantity(new BigDecimal(10))
                    .pricePerUnit(new BigDecimal(5))
                    .brand("Marca1")
                    .build());
            PurchaseItem purchaseItem2 = this.purchaseItemRepository.save(PurchaseItem.builder()
                    .input(input2)
                    .unit(unit2)
                    .quantity(new BigDecimal(20))
                    .pricePerUnit(new BigDecimal(15))
                    .brand("Marca2")
                    .build());
            Provider provider1 = this.providerRepository.save(Provider.builder().name("Loja A").cnpj("123456").build());
            Provider provider2 = this.providerRepository.save(Provider.builder().name("Loja B").cnpj("234567").build());
            Purchase purchase1 = this.purchaseRepository.save(
                   Purchase.builder()
                           .provider(provider1)
                           .item(purchaseItem1)
                           .item(purchaseItem2)
                           .additionalValue(BigDecimal.ZERO)
                           .transaction(transaction3)
                           .build());
        }

}
