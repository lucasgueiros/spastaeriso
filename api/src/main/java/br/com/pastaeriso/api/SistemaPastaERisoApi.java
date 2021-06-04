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
package br.com.pastaeriso.api;

import br.com.pastaeriso.accounting.account.Account;
import br.com.pastaeriso.accounting.transaction.Entry;
import br.com.pastaeriso.accounting.transaction.GenericTransaction;
import br.com.pastaeriso.accounting.transaction.modality.TransactionModality;
import br.com.pastaeriso.api.accounting.account.AccountRepository;
import br.com.pastaeriso.api.accounting.entry.EntryRepository;
import br.com.pastaeriso.api.accounting.transaction.TransactionModalityRepository;
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
import br.com.pastaeriso.recipeBook.unit.UnitQuantity;
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
import br.com.pastaeriso.api.people.address.neighborhoods.NeighborhoodRepository;
import br.com.pastaeriso.api.people.functionary.function.FunctionaryFunctionRepository;
import br.com.pastaeriso.api.people.functionary.workingTime.FunctionaryWorkingTimeRepository;
import br.com.pastaeriso.api.people.person.PersonRepository;
import br.com.pastaeriso.api.products.category.ProductCategoryRepository;
import br.com.pastaeriso.api.products.product.ProductRepository;
import br.com.pastaeriso.api.products.product.items.ProductItemRepository;
import br.com.pastaeriso.api.products.product.price.ProductPriceRepository;
import br.com.pastaeriso.api.purchases.inventory.InventoryMovementEventHandler;
import br.com.pastaeriso.api.purchases.inventory.InventoryMovementRepository;
import br.com.pastaeriso.api.recipeBook.item.ItemRepository;
import br.com.pastaeriso.api.recipeBook.recipe.RecipeRepository;
import br.com.pastaeriso.api.recipeBook.recipe.ingredient.IngredientRepository;
import br.com.pastaeriso.api.recipeBook.recipe.intruction.InstructionRepository;
import br.com.pastaeriso.api.recipeBook.unit.UnitQuantityRepository;
import br.com.pastaeriso.api.sales.order.ClientOrderRepository;
import br.com.pastaeriso.people.address.neighborhoods.Neighborhood;
import br.com.pastaeriso.people.address.type.AddressType;
import br.com.pastaeriso.people.contact.channel.ContactChannel;
import br.com.pastaeriso.people.functionary.function.FunctionaryFunction;
import br.com.pastaeriso.people.functionary.workingTime.FunctionaryWorkingTime;
import br.com.pastaeriso.people.person.Person;
import br.com.pastaeriso.products.category.ProductCategory;
import br.com.pastaeriso.products.product.Product;
import br.com.pastaeriso.products.product.items.ProductItem;
import br.com.pastaeriso.products.product.price.ProductPrice;
import br.com.pastaeriso.purchases.inventory.InventoryMovement;
import br.com.pastaeriso.recipeBook.item.Item;
import br.com.pastaeriso.recipeBook.recipe.Recipe;
import br.com.pastaeriso.recipeBook.recipe.ingredient.Ingredient;
import br.com.pastaeriso.recipeBook.recipe.intruction.Instruction;
import br.com.pastaeriso.sales.order.ClientOrder;
import br.com.pastaeriso.sales.order.OrderItem;
import java.time.LocalDateTime;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import br.com.pastaeriso.api.sales.order.OrderItemRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableAutoConfiguration
@EnableTransactionManagement
@EntityScan("br.com.pastaeriso")
public class SistemaPastaERisoApi {

	public static void main(String[] args) {
            SpringApplication.run(SistemaPastaERisoApi.class, args);
	}
        
        @Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry
                                        .addMapping("/**")
                                        .allowedOrigins("http://localhost:3000")
                                        .allowedMethods("OPTIONS","HEAD","GET","POST","PUT","PATCH","DELETE");
			}
		};
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
        private InventoryMovementEventHandler inventoryMovementEventHandler;
        @Autowired
        private NeighborhoodRepository neighborhoodRepository;
        @Autowired
        private ProductPriceRepository productPriceRepository;
        @Autowired
        private ProductItemRepository productItemRepository;
        @Autowired
        private PersonRepository personRepository;
        @Autowired
        private OrderItemRepository orderProductRepository;
        @Autowired
        private ClientOrderRepository clientOrderRepository;
        @Autowired
        private UnitQuantityRepository unitQuantityRepository;
        
        @Autowired
        private PurchaseRepository purchaseRepository;
        @PostConstruct
        public void insertToDatabase() {
            // BASIC DATA
            
            UnitQuantity quantityVolume = UnitQuantity.builder().name("volume").build();
            UnitQuantity quantityPeso = UnitQuantity.builder().name("peso").build();
            UnitQuantity quantityTempo = UnitQuantity.builder().name("tempo").build();
            UnitQuantity quantityOutros = UnitQuantity.builder().name("outros").build();
            
            quantityVolume = this.unitQuantityRepository.save(quantityVolume);
            quantityPeso = this.unitQuantityRepository.save(quantityPeso);
            quantityTempo = this.unitQuantityRepository.save(quantityTempo);
            quantityOutros = this.unitQuantityRepository.save(quantityOutros);
            
            
            Unit unitkg = this.unitRepository.save(Unit.builder().pluralizedName("quilogramas").name("quilograma").symbol("kg").quantity(quantityPeso).build());
            Unit unitL = this.unitRepository.save(Unit.builder().name("litro").pluralizedName("litros").symbol("L").quantity(quantityVolume).build());
            Unit unitmL = this.unitRepository.save(Unit.builder().name("mililitro").pluralizedName("mililitros").symbol("mL").quantity(quantityVolume).build());
            Unit unitUN = this.unitRepository.save(Unit.builder().name("unidade").pluralizedName("unidades").symbol("UN").quantity(quantityPeso).build());
            Unit unitmin = this.unitRepository.save(Unit.builder().name("minuto").pluralizedName("minutos").symbol("min").quantity(quantityTempo).build());
            Unit unitg = this.unitRepository.save(Unit.builder().name("grama").pluralizedName("gramas").symbol("g").quantity(quantityPeso).build());
            
            quantityPeso.setFavorite(unitg);
            quantityOutros.setFavorite(unitUN);
            quantityTempo.setFavorite(unitmin);
            quantityVolume.setFavorite(unitmL);
            
            quantityVolume = this.unitQuantityRepository.save(quantityVolume);
            quantityPeso = this.unitQuantityRepository.save(quantityPeso);
            quantityTempo = this.unitQuantityRepository.save(quantityTempo);
            quantityOutros = this.unitQuantityRepository.save(quantityOutros);
            
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
            Input input12 = this.inputRepository.save(new Input("Manjericão"));
            Input input13 = this.inputRepository.save(new Input("Presunto de Parma"));
            Input input14 = this.inputRepository.save(new Input("Queijo Gorgonzola"));
            Input input15 = this.inputRepository.save(new Input("Queijo Parmesão"));
            Input input16 = this.inputRepository.save(new Input("Queijo Provole"));
            Input input17 = this.inputRepository.save(new Input("Azeite de Oliva"));
            
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
            
            ProductCategory productCategory1 = productCategoryRepository.save(new ProductCategory("pizza"));
            ProductCategory productCategory2 = productCategoryRepository.save(new ProductCategory("massas"));
            
            AddressType addressType1 = addressTypeRepository.save(new AddressType("Casa"));
            AddressType addressType2 = addressTypeRepository.save(new AddressType("Apartamento"));
            
            ContactChannel contactChannel1 = contactChannelRepository.save(new ContactChannel("WhatsApp"));
            ContactChannel contactChannel2 = contactChannelRepository.save(new ContactChannel("Instagram"));
            
            Neighborhood neighborhood1 = neighborhoodRepository.save(new Neighborhood("Heliópolis"));
            Neighborhood neighborhood2 = neighborhoodRepository.save(new Neighborhood("Severiano Moraes Filho"));
            Neighborhood neighborhood3 = neighborhoodRepository.save(new Neighborhood("COHAB 1"));
            Neighborhood neighborhood4 = neighborhoodRepository.save(new Neighborhood("COHAB 2"));
            Neighborhood neighborhood5 = neighborhoodRepository.save(new Neighborhood("Parque Fênix"));
            
            // EXEMPLE DATA
            /*Entry entry1 = Entry.builder()
                    .account(account1).value(new BigDecimal(10)).build();
            Entry entry2 = Entry.builder()
                    .account(account2)
                    .value(new BigDecimal(-10)).build();
            Entry entry3 = Entry.builder()
                    .account(account3).value(new BigDecimal(20)).build();
            Entry entry4 = Entry.builder()
                    .account(account1).value(new BigDecimal(-20)).build();
            Entry entry5 = Entry.builder().account(account3).value(new BigDecimal(30)).build();
            Entry entry6 = Entry.builder().account(account2).value(new BigDecimal(-30)).build();
            
            
            
            GenericTransaction transaction1 = GenericTransaction.builder()
                            .modality(transactionModality2)
                            .date(LocalDateTime.of(2020, Month.DECEMBER, 23, 0, 0))
                            .entry(entry1)
                            .entry(entry2)
                            .description("Alguma transação")
                            .build();
            GenericTransaction transaction2 = GenericTransaction.builder()
                            .modality(transactionModality1)
                            .entry(entry3)
                            .entry(entry4)
                            .date(LocalDateTime.of(2020, Month.MARCH, 3, 0, 0))
                            .description("Outra transação")
                            .build();
            GenericTransaction transaction3 = GenericTransaction.builder()
                            .modality(transactionModality1)
                            .entry(entry5)
                            .entry(entry6)
                            .date(LocalDateTime.of(2021, Month.MARCH, 3, 0, 0))
                            .description("Transação aí")
                            .build();
            
            entry1 = this.entryRepository.save(entry1);
            entry2 = this.entryRepository.save(entry2);
            entry3 = this.entryRepository.save(entry3);
            entry4 = this.entryRepository.save(entry4);
            entry5 = this.entryRepository.save(entry5);
            entry6 = this.entryRepository.save(entry6);
            
            transaction1 = this.transactionRepository.save(transaction1);
            transaction2 = this.transactionRepository.save(transaction2);
            transaction3 = this.transactionRepository.save(transaction3);
            
            InventoryMovement inventoryMovement1 = InventoryMovement.builder()
                    .input(input1)
                    .unit(unitkg)
                    .quantity(new BigDecimal(10))
                    .build();
            inventoryMovementEventHandler.handleBeforeCreate(inventoryMovement1);
            inventoryMovement1 = inventoryMovementRepository.save(inventoryMovement1);
            InventoryMovement inventoryMovement2 = InventoryMovement.builder()
                    .input(input2)
                    .unit(unitL)
                    .quantity(new BigDecimal(20))
                    .build();
            inventoryMovementEventHandler.handleBeforeCreate(inventoryMovement2);
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
            Ingredient ingredient1 = Ingredient.builder().index(1).input(input5).quantity(new BigDecimal(1)).unit(unitUN).build();
            Ingredient ingredient2 = Ingredient.builder().index(2).input(input6).quantity(new BigDecimal(1)).unit(unitkg).build();
            Ingredient ingredient3 = Ingredient.builder().index(3).input(input7).quantity(new BigDecimal(5)).unit(unitkg).build();
            Ingredient ingredient4 = Ingredient.builder().index(4).input(input9).unit(unitUN).quantity(new BigDecimal(5)).build();
            
            ingredient1 = ingredientRepository.save(ingredient1);
            ingredient2 = ingredientRepository.save(ingredient2);
            ingredient3 = ingredientRepository.save(ingredient3);
            ingredient4 = ingredientRepository.save(ingredient4);
            
            // Instructions
            Instruction instruction1 = Instruction.builder().index(1).text("Coloque a manteiga na panela e ligue o fogo").build();
            Instruction instruction2 = Instruction.builder().index(2).text("Coloque o ovo e o sal por cima").build();
            Instruction instruction3 = Instruction.builder().index(3).text("Quando a clara estiver firme desligue o fogo e tire o ovo").build();
            instruction1 = instructionRepository.save(instruction1);
            instruction2 = instructionRepository.save(instruction2);
            instruction3 = instructionRepository.save(instruction3);
            
            // Outuput
            Item item1 = Item.builder().input(input8).unit(unitUN).quantity(BigDecimal.ONE).build();
            item1 = itemRepository.save(item1);
            
            
            // Working
            FunctionaryFunction functionaryFunction1 = FunctionaryFunction.builder().name("Chef").build();
            FunctionaryFunction functionaryFunction2 = FunctionaryFunction.builder().name("Auxiliar de cozinha").build();
            functionaryFunction1 = functionaryFunctionRepository.save(functionaryFunction1);
            functionaryFunction2 = functionaryFunctionRepository.save(functionaryFunction2);
            
            FunctionaryWorkingTime functionaryWorkingTime = FunctionaryWorkingTime.builder().functionaryFunction(functionaryFunction1).minutes(10).build();
            functionaryWorkingTime = functionaryWorkingTimeRepository.save(functionaryWorkingTime);
            // Receitas exemplares
            Recipe recipe = Recipe.builder()
                    .revision(LocalDate.now())
                    .totalTime(5)
                    .work(functionaryWorkingTime)
                    .title("Ovo frito")
                    .ingredient(ingredient1)
                    .ingredient(ingredient2)
                    .ingredient(ingredient3)
                    .ingredient(ingredient4)
                    .instruction(instruction1)
                    .instruction(instruction2)
                    .instruction(instruction3)
                    .output(item1)
                    .build();
            recipeRepository.save(recipe);
            
            ProductPrice price1 = ProductPrice.builder()
                    .date(LocalDate.of(2020, Month.MARCH, 10))
                    .price(new BigDecimal(15))
                    .build();
            ProductPrice price2 = ProductPrice.builder()
                    .date(LocalDate.of(2021, Month.JANUARY, 10))
                    .price(new BigDecimal(20))
                    .build();
            
            price1 = productPriceRepository.save(price1);
            price2 = productPriceRepository.save(price2);
            
            ProductItem productItem1 = ProductItem.builder()
                    .input(input9)
                    .unit(unitg)
                    .quantity(BigDecimal.ONE)
                    .recipe(recipe)
                    .comment("--")
                    .build();
            productItem1 = productItemRepository.save(productItem1);
            Product product1 = Product.builder()
                    .name("Pizza Margherita")
                    .category(productCategory1)
                    .category(productCategory2)
                    .price(price1)
                    .price(price2)
                    .item(productItem1)
                    .build();
            product1 = productRepository.save(product1);
            
            Person person1 = Person.builder()
                    .name("Viviane")
                    .build();
            person1 = personRepository.save(person1);
            Person person2 = Person.builder()
                    .name("Mateus")
                    .build();
            person2 = personRepository.save(person2);
            Person person3 = Person.builder()
                    .name("Luciana")
                    .build();
            person3 = personRepository.save(person3);
            Person person4 = Person.builder()
                    .name("Neemias")
                    .build();
            person4 = personRepository.save(person4);
            Person person5 = Person.builder()
                    .name("Lucas")
                    .build();
            person5 = personRepository.save(person5);
            Person person6 = Person.builder()
                    .name("Matheus")
                    .build();
            person6 = personRepository.save(person6);
            Person person7 = Person.builder()
                    .name("João")
                    .build();
            person7 = personRepository.save(person7);
            Person person8 = Person.builder()
                    .name("Joana")
                    .build();
            person8 = personRepository.save(person8);
            Person person10 = Person.builder()
                    .name("Tiago")
                    .build();
            person10 = personRepository.save(person10);
            Person person12 = Person.builder()
                    .name("Pedro")
                    .build();
            person12 = personRepository.save(person12);
            Person person13 = Person.builder()
                    .name("Daniel")
                    .build();
            person13 = personRepository.save(person13);
            Person person14 = Person.builder()
                    .name("Rosana")
                    .build();
            person14 = personRepository.save(person14);
            Person person15 = Person.builder()
                    .name("Timóteo")
                    .build();
            person15 = personRepository.save(person15);
            Person person16 = Person.builder()
                    .name("Henrique")
                    .build();
            person16 = personRepository.save(person16);
            OrderItem orderProduct1 = OrderItem.builder()
                    .product(product1)
                    .quantity(BigDecimal.ONE)
                    .build();
            orderProduct1 = orderProductRepository.save(orderProduct1);
            ClientOrder order = ClientOrder.builder()
                    .client(person1)
                    .item(orderProduct1)
                    .serveDate(LocalDate.now())
                    .build();
            order = clientOrderRepository.save(order);*/
            
        }

}
