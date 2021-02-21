/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
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
