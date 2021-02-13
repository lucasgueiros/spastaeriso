/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.planning.shoppingList;

import br.com.pastaeriso.purchases.provider.Provider;
import br.com.pastaeriso.recipeBook.item.Item;
import java.math.BigDecimal;

/**
 *
 * @author lucas
 */
public class ShoppingListItem extends Item {
    
    private BigDecimal expectedPrice;
    private Provider suggestedProvider;
    
}
