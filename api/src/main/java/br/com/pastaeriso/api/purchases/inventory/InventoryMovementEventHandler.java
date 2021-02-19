/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.api.purchases.inventory;

import br.com.pastaeriso.purchases.inventory.InventoryMovement;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

/**
 *
 * @author lucas
 */
@RepositoryEventHandler
public class InventoryMovementEventHandler {
    
    @Autowired
    private InventoryMovementRepository inventoryMovementRepository;
    
    /*@HandleBeforeCreate
    @HandleBeforeSave
    public void handleInventoryMovementBeforeSaveOrUpdate(InventoryMovement im) {
        List<InventoryMovement> imsAfter = inventoryMovementRepository.findByInputAndDateGreaterThenEqual(im.getInput(), im.getDate());
        Optional<InventoryMovement> imBeforeOptional = inventoryMovementRepository.findLastByInputWithDateBeforeOrderByDateAsc(im.getInput(), im.getDate());
        BigDecimal balance = BigDecimal.ZERO;
        if(imBeforeOptional.isPresent()) {
            InventoryMovement imBefore = imBeforeOptional.get();
            if(imBefore.getCheckedBalance() != null) {
                balance = imBefore.getCheckedBalance();
            } else if(imBefore.getCalculatedBalance() != null){
                balance = imBefore.getCalculatedBalance();
            } else {
                // PRECISA RECALCULAR TUDO!
            }
        }
        balance = balance.add(im.getQuantity());
        im.setCalculatedBalance(balance);
    }*/
    
}
