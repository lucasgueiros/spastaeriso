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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

/**
 *
 * @author lucas
 */
@Component
@RepositoryEventHandler(InventoryMovement.class)
public class InventoryMovementEventHandler {
    
    @Autowired
    private InventoryMovementRepository inventoryMovementRepository;
    
    Logger logger = LoggerFactory.getLogger(InventoryMovementEventHandler.class);

    
    @HandleBeforeCreate(InventoryMovement.class)
    public void handleBeforeCreate(InventoryMovement im) {
        /*BigDecimal balance = BigDecimal.ZERO;
        List<InventoryMovement> imsAfter = inventoryMovementRepository.findByInputAndDateGreaterThanEqual(im.getInput(), im.getDate());
        Optional<InventoryMovement> imBeforeOptional = inventoryMovementRepository.findLastByInputAndDateLessThanOrderByDateAsc(im.getInput(), im.getDate());
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
        im.setCalculatedBalance(balance);*/
    }
    
}
