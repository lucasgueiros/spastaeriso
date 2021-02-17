package br.com.pastaeriso.api;

import br.com.pastaeriso.accounting.account.Account;
import br.com.pastaeriso.accounting.entry.Entry;
import br.com.pastaeriso.accounting.transaction.GenericTransaction;
import br.com.pastaeriso.accounting.transaction.modality.TransactionModality;
import br.com.pastaeriso.api.accounting.account.AccountRepository;
import br.com.pastaeriso.api.accounting.entry.EntryRepository;
import br.com.pastaeriso.api.accounting.transaction.modality.TransactionModalityRepository;
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
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import br.com.pastaeriso.api.accounting.transaction.GenericTransactionRepository;
import br.com.pastaeriso.api.people.functionary.function.FunctionaryFunctionRepository;
import br.com.pastaeriso.api.people.functionary.workingTime.FunctionaryWorkingTimeRepository;
import br.com.pastaeriso.api.products.category.ProductCategoryRepository;
import br.com.pastaeriso.api.products.product.ProductRepository;
import br.com.pastaeriso.api.purchases.inventory.InventoryMovementRepository;
import br.com.pastaeriso.api.recipeBook.item.ItemRepository;
import br.com.pastaeriso.api.recipeBook.recipe.RecipeRepository;
import br.com.pastaeriso.api.recipeBook.recipe.ingredient.IngredientRepository;
import br.com.pastaeriso.api.recipeBook.recipe.intruction.InstructionRepository;
import br.com.pastaeriso.people.functionary.function.FunctionaryFunction;
import br.com.pastaeriso.people.functionary.workingTime.FunctionaryWorkingTime;
import br.com.pastaeriso.products.category.ProductCategory;
import br.com.pastaeriso.products.product.Product;
import br.com.pastaeriso.purchases.inventory.InventoryMovement;
import br.com.pastaeriso.recipeBook.item.Item;
import br.com.pastaeriso.recipeBook.recipe.Recipe;
import br.com.pastaeriso.recipeBook.recipe.ingredient.Ingredient;
import br.com.pastaeriso.recipeBook.recipe.intruction.Instruction;

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
        private ContactChannelRepository contactChannelRepository;
        @Autowired
        private AddressTypeRepository addressTypeRepository;
        @Autowired
        private GenericTransactionRepository transactionRepository;
        @Autowired
        private EntryRepository entryRepository;
        @Autowired
        private PurchaseItemRepository purchaseItemRepository;
        @Autowired
        private ProviderRepository providerRepository;
        @Autowired
        private RecipeRepository recipeRepository;
        @Autowired
        private IngredientRepository ingredientRepository;
        @Autowired
        private InstructionRepository instructionRepository;
        @Autowired
        private ItemRepository itemRepository;
        @Autowired
        private FunctionaryFunctionRepository functionaryFunctionRepository;
        @Autowired
        private FunctionaryWorkingTimeRepository functionaryWorkingTimeRepository;
        @Autowired
        private ProductRepository productRepository;
        @Autowired
        private ProductCategoryRepository productCategoryRepository;
        @Autowired
        private InventoryMovementRepository inventoryMovementRepository;
        
        @Autowired
        private PurchaseRepository purchaseRepository;
        @PostConstruct
        public void insertToDatabase() {
            // BASIC DATA
            Unit unit1 = this.unitRepository.save(Unit.builder().name("kg").quantity(Quantity.WEIGHT).favorite(true).build());
            Unit unit2 = this.unitRepository.save(new Unit("L", Quantity.VOLUME));
            Unit unit3 = this.unitRepository.save(Unit.builder().name("mL").quantity(Quantity.VOLUME).favorite(true).build());
            Unit unit4 = this.unitRepository.save(new Unit("UN", Quantity.NON_CONVERTIBLE));
            Unit unit5 = this.unitRepository.save(new Unit("min", Quantity.TIME));
            
            Input input1 = this.inputRepository.save(new Input("Tomate"));
            Input input2 = this.inputRepository.save(new Input("Cebola"));
            Input input3 = this.inputRepository.save(new Input("Farinha de trigo"));
            Input input4 = this.inputRepository.save(new Input("Desconhecido"));
            Input input5 = this.inputRepository.save(new Input("Ovo"));
            Input input6 = this.inputRepository.save(new Input("Manteiga"));
            Input input7 = this.inputRepository.save(new Input("Sal"));
            Input input8 = this.inputRepository.save(new Input("Ovo frito"));
            Input input9 = this.inputRepository.save(new Input("Gás de cozinha"));
            Input input10 = this.inputRepository.save(new Input("Queijo coaho"));
            Input input11 = this.inputRepository.save(new Input("Queijo assado"));
            
            Account account1 = this.accountRepository.save(new Account("Compras"));
            Account account2 = this.accountRepository.save(new Account("Caixa"));
            Account account3 = this.accountRepository.save(new Account("Pedidos"));
            Account account4 = this.accountRepository.save(new Account("Desconhecida"));
            
            TransactionModality transactionModality1 = this.transactionModalityRepository.save(new TransactionModality("Espécie"));
            TransactionModality transactionModality2 = this.transactionModalityRepository.save(new TransactionModality("Cheque"));
            TransactionModality transactionModality3 = this.transactionModalityRepository.save(new TransactionModality("Cartão de crédito (à vista)"));
            TransactionModality transactionModality4 = this.transactionModalityRepository.save(new TransactionModality("Cartão de crédito (à prazo)"));
            TransactionModality transactionModality5 = this.transactionModalityRepository.save(new TransactionModality("Cartão de débito"));
            TransactionModality transactionModality6 = this.transactionModalityRepository.save(new TransactionModality("Crédito loja"));
            TransactionModality transactionModality7 = this.transactionModalityRepository.save(new TransactionModality("Boleto bancário"));
            
            // EXEMPLE DATA
            Entry entry1 = this.entryRepository.save(Entry.builder().account(account1).value(new BigDecimal(10)).build());
            Entry entry2 = this.entryRepository.save(Entry.builder()
                    .account(account2)
                    .value(new BigDecimal(-10)).build());
            Entry entry3 = this.entryRepository.save(Entry.builder().account(account3).value(new BigDecimal(20)).build());
            Entry entry4 = this.entryRepository.save(Entry.builder().account(account1).value(new BigDecimal(-20)).build());
            Entry entry5 = this.entryRepository.save(Entry.builder().account(account3).value(new BigDecimal(30)).build());
            Entry entry6 = this.entryRepository.save(Entry.builder().account(account2).value(new BigDecimal(-30)).build());
            
            GenericTransaction transaction1 = this.transactionRepository.save(GenericTransaction.builder()
                            .date(LocalDate.of(2020, Month.DECEMBER, 23))
                            .modality(transactionModality2)
                            .entry(entry1)
                            .entry(entry2)
                            .description("Alguma transação")
                            .build());
            GenericTransaction transaction2 = this.transactionRepository.save(GenericTransaction.builder()
                            .date(LocalDate.of(2020, Month.MARCH, 3))
                            .modality(transactionModality1)
                            .entry(entry3)
                            .entry(entry4)
                            .description("Outra transação")
                            .build());
            InventoryMovement inventoryMovement1 = InventoryMovement.builder()
                    .input(input1)
                    .unit(unit1)
                    .quantity(new BigDecimal(10))
                    .build();
            inventoryMovement1 = inventoryMovementRepository.save(inventoryMovement1);
            InventoryMovement inventoryMovement2 = InventoryMovement.builder()
                    .input(input2)
                    .unit(unit2)
                    .quantity(new BigDecimal(20))
                    .build();
            inventoryMovement2 = inventoryMovementRepository.save(inventoryMovement2);
            
            PurchaseItem purchaseItem1 = this.purchaseItemRepository.save(PurchaseItem.builder()
                    .inventoryMovement(inventoryMovement1)
                    .pricePerUnit(new BigDecimal(5))
                    .brand("Marca1")
                    .build());
            PurchaseItem purchaseItem2 = this.purchaseItemRepository.save(PurchaseItem.builder()
                    .inventoryMovement(inventoryMovement2)
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
                           .transaction(transaction1)
                           .build());
            
            // Ingredients
            Ingredient ingredient1 = Ingredient.builder().index(1).input(input5).quantity(new BigDecimal(1)).unit(unit4).build();
            Ingredient ingredient2 = Ingredient.builder().index(2).input(input6).quantity(new BigDecimal(1)).unit(unit1).build();
            Ingredient ingredient3 = Ingredient.builder().index(3).input(input7).quantity(new BigDecimal(5)).unit(unit1).build();
            ingredient1 = ingredientRepository.save(ingredient1);
            ingredient2 = ingredientRepository.save(ingredient2);
            ingredient3 = ingredientRepository.save(ingredient3);
            
            // Instructions
            Instruction instruction1 = Instruction.builder().index(1).text("Coloque a manteiga na panela e ligue o fogo").build();
            Instruction instruction2 = Instruction.builder().index(2).text("Coloque o ovo e o sal por cima").build();
            Instruction instruction3 = Instruction.builder().index(3).text("Quando a clara estiver firme desligue o fogo e tire o ovo").build();
            instruction1 = instructionRepository.save(instruction1);
            instruction2 = instructionRepository.save(instruction2);
            instruction3 = instructionRepository.save(instruction3);
            
            // Outuput
            Item item1 = Item.builder().input(input8).unit(unit4).quantity(BigDecimal.ONE).build();
            Item item2 = Item.builder().input(input9).unit(unit4).quantity(new BigDecimal(5)).build();
            item1 = itemRepository.save(item1);
            item2 = itemRepository.save(item2);
            
            // Working
            FunctionaryFunction functionaryFunction1 = FunctionaryFunction.builder().name("Chef").build();
            FunctionaryFunction functionaryFunction2 = FunctionaryFunction.builder().name("Auxiliar de cozinha").build();
            functionaryFunction1 = functionaryFunctionRepository.save(functionaryFunction1);
            functionaryFunction2 = functionaryFunctionRepository.save(functionaryFunction2);
            
            FunctionaryWorkingTime functionaryWorkingTime = FunctionaryWorkingTime.builder().functionaryFunction(functionaryFunction1).minutes(10).build();
            functionaryWorkingTime = functionaryWorkingTimeRepository.save(functionaryWorkingTime);
            // Receitas exemplares
            Recipe recipe = Recipe.builder()
                    .date(LocalDate.now())
                    .totalTime(5)
                    .work(functionaryWorkingTime)
                    .title("Ovo frito")
                    .ingredient(ingredient1)
                    .ingredient(ingredient2)
                    .ingredient(ingredient3)
                    .instruction(instruction1)
                    .instruction(instruction2)
                    .instruction(instruction3)
                    .output(item1)
                    .otherItem(item2)
                    .build();
            recipeRepository.save(recipe);
            
            ProductCategory productCategory1 = productCategoryRepository.save(new ProductCategory("pizza"));
            ProductCategory productCategory2 = productCategoryRepository.save(new ProductCategory("massas"));
            Product product1 = Product.builder().name("Pizza Margherita").category(productCategory1).category(productCategory2).build();
            product1 = productRepository.save(product1);
            
        }

}
