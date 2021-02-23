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
package br.com.pastaeriso.api.purchases.inventory;

import br.com.pastaeriso.purchases.inventory.InventoryMovement;
import br.com.pastaeriso.recipeBook.input.Input;
import br.com.pastaeriso.recipeBook.item.Item;
import br.com.pastaeriso.recipeBook.unit.Unit;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author lucas
 */
@RestController
@CrossOrigin
public class InventoryMovementController {
    @Autowired
    private InventoryMovementRepository repository;
    
    private class ReturnQuantity{
        public BigDecimal quantity;
        public String unit;
        public String input;
    }
    
    private class Quantity {
        public BigDecimal quantity;
        public Unit unit;
        
    }
    
    @GetMapping("/inventoryMovements/balance")
    public List<ReturnQuantity> balance() {
        Map<Input,Quantity> qs = updateBalance();
        List<ReturnQuantity> items = new LinkedList<>();
        for(Input i : qs.keySet()) {
            ReturnQuantity rq = new ReturnQuantity();
            rq.input = i.getName();
            rq.unit = qs.get(i).unit.getName();
            rq.quantity = qs.get(i).quantity;
            items.add(rq);
        }
        items.sort((i1,i2) -> {
            return i1.input.compareTo(i2.input);
        });
        return items;
    }
    
    public Map<Input,Quantity> updateBalance() {
       
       Map<Input,Quantity> quantities = new HashMap<>();
       
       List<InventoryMovement> movements = repository.findAllByOrderByDateAsc();
       
       for(InventoryMovement im : movements) {
           Quantity q;
           if(quantities.containsKey(im.getInput())) {
               q = quantities.get(im.getInput());
               if(q.unit.equals(im.getUnit())){
                   if(im.getCheckedBalance() != null) {
                       q.quantity = im.getCheckedBalance();
                   } else {
                       q.quantity = q.quantity.add(im.getQuantity());
                   }
               } else {
                   // converter unidade
               }
           } else {
               q = new Quantity();
               if(im.getCheckedBalance() != null) {
                   q.quantity = im.getCheckedBalance();
               } else {
                   q.quantity = im.getQuantity();
               }
               q.unit = im.getUnit();
               quantities.put(im.getInput(), q);
           }
           im.setCalculatedBalance(q.quantity);
           repository.save(im);
       }
       return quantities;
       
   } 
}
