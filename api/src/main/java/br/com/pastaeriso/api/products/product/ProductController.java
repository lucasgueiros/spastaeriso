package br.com.pastaeriso.api.products.product;

import br.com.pastaeriso.api.purchases.purchase.items.PurchaseItemRepository;
import br.com.pastaeriso.products.product.Product;
import br.com.pastaeriso.products.product.ProductRecipe;
import br.com.pastaeriso.purchases.purchase.items.PurchaseItem;
import br.com.pastaeriso.recipeBook.input.Input;
import br.com.pastaeriso.recipeBook.item.Item;
import br.com.pastaeriso.recipeBook.recipe.Recipe;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping
public class ProductController {

    @Autowired
    private ProductRepository repository;
    
    @Autowired
    private PurchaseItemRepository purchaseItemRepository;
    
    private BigDecimal calculateCost(Product product) {
        
        List<Item> items = new LinkedList<>(product.getItems());
        
        // Gere o Mapa de receitas
        Map<Input,Recipe> recipes = new HashMap<>();
        for(ProductRecipe productRecipe : product.getRecipes()) {
            recipes.put(productRecipe.getOutput(), productRecipe.getRecipe());
        }
        
        // gere a lista completa de itens
        ListIterator<Item> iterator = items.listIterator(items.size()-1);
        while(iterator.hasPrevious()) {
            Item item = iterator.previous();
            
            Recipe recipe = recipes.get(item.getInput());
            if(recipe != null){
                BigDecimal quantity = item.getQuantity();
                
                List<Item> recipeItems = new LinkedList<>(recipe.getIngredients());
                recipeItems.addAll(recipe.getOtherItems());
                
                ListIterator<Item> recipeItemInterator = recipeItems.listIterator();
                
                // Proporcione a quantidade
                iterator.remove();
                while(recipeItemInterator.hasNext()) {
                    Item recipeItem = recipeItemInterator.next();
                    recipeItem = recipeItem.adjust(quantity);
                    iterator.add(recipeItem);
                }
            }
            
        }
        
        // Agora some os repetidos
        iterator = items.listIterator();
        while(iterator.hasNext()) {
            Item item = iterator.next();
            ListIterator<Item> otherIterator = items.listIterator(iterator.nextIndex());
            while(otherIterator.hasNext()) {
                Item otherItem = otherIterator.next();
                if(item.getInput().equals(otherItem.getInput())
                        && item.getUnit().equals(otherItem.getQuantity())) {
                    // sum
                    item = item.sum(otherItem);
                    otherIterator.remove();
                }
            }
            iterator.set(item);
        }
        
        // calcules os preços
        Map<Item,BigDecimal> prices = new HashMap<>();
        iterator = items.listIterator();
        while(iterator.hasNext()) {
            Item item = iterator.next();
            
            List<PurchaseItem> purchaseItems = purchaseItemRepository.findByInventoryMovement_Input(item.getInput());
            purchaseItems.sort((pi1,pi2) -> pi1.getInventoryMovement().getDate().compareTo(pi2.getInventoryMovement().getDate()));
            ListIterator<PurchaseItem> purchaseItemIterator  = purchaseItems.listIterator();
            
            BigDecimal priceTotal = BigDecimal.ZERO;
            int divisor = 0;
            
            while(purchaseItemIterator.hasNext()) {
                PurchaseItem purchaseItem = purchaseItemIterator.next();
                if(purchaseItem.getInventoryMovement().getUnit().equals(item.getUnit())) {
                    
                }
            }
            
        }
        
        // some os preços
        BigDecimal total = BigDecimal.ZERO;
        
        for(Item item : items) {
            total = total.add(prices.get(item));
        }
        
        return total;
    }

    public class TableRow {
        public String product;
        public BigDecimal price;
        public BigDecimal cost;

        public TableRow(String product, BigDecimal price, BigDecimal cost) {
            this.product = product;
            this.price = price;
            this.cost = cost;
        }




    }

    @GetMapping("/products/costs")
    public List<TableRow> calculateCosts() {
            List<TableRow> result = new LinkedList<>();

            for (Product product : repository.findAll()) {
                result.add(new TableRow(product.getName(), product.getPrice(), this.calculateCost(product)));
            }

            return result;
    }

}
