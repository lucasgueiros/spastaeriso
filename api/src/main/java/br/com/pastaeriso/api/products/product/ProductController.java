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
package br.com.pastaeriso.api.products.product;

import br.com.pastaeriso.api.purchases.purchase.items.PurchaseItemController;
import br.com.pastaeriso.api.purchases.purchase.items.PurchaseItemRepository;
import br.com.pastaeriso.products.product.Product;
import br.com.pastaeriso.products.product.ProductRecipe;
import br.com.pastaeriso.purchases.purchase.items.PurchaseItem;
import br.com.pastaeriso.recipeBook.input.Input;
import br.com.pastaeriso.recipeBook.input.price.InputPrice;
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
import org.springframework.transaction.annotation.Transactional;
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
    private PurchaseItemController purchaseItemController;
    
    @Transactional
    private BigDecimal calculateCost(Product product) {
        
        List<Item> items = new LinkedList<>(product.getItems());
        if(items.isEmpty()) {
            return BigDecimal.ZERO;
        }
        
        
        // gere a lista completa de itens
        ListIterator<Item> iterator = items.listIterator(items.size()-1);
        /*while(iterator.hasPrevious()) {
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
            
        }*/
        
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
        Map<Input,PurchaseItemController.SimplerQuantity> prices = purchaseItemController.updateBalance();
        
        // some os preços
        BigDecimal total = BigDecimal.ZERO;
        
        for(Item item : items) {
            if(prices.containsKey(item.getInput())) {
                PurchaseItemController.SimplerQuantity q = prices.get(item.getInput());
                if(item.getUnit().equals(q.unit)){
                    total = total.add(item.getQuantity().multiply(q.avgPrice));
                } else {
                    // CONVERTER UNIDADE
                }
            } else if(item.getInput().hasPrices()) {
                InputPrice price = item.getInput().getLastPrice();
                if(price == null) {
                    // IGNORE
                }
                if(price.getUnit().equals(item.getUnit())){
                    total = total.add(item.getQuantity().multiply(price.getPricePerUnit()));
                } else {
                    // CONVERTER UNIDADE
                }
            }
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
    @Transactional
    public List<TableRow> calculateCosts() {
            List<TableRow> result = new LinkedList<>();

            for (Product product : repository.findAll()) {
                result.add(new TableRow(product.getName(), product.getPrice(), this.calculateCost(product)));
            }

            return result;
    }

}
