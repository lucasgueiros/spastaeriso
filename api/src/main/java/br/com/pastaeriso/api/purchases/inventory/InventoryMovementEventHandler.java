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
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
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
    private InventoryMovementController controller;
    
    Logger logger = LoggerFactory.getLogger(InventoryMovementEventHandler.class);

    
    @HandleAfterCreate
    @HandleAfterSave
    @HandleAfterDelete
    public void handleBeforeCreate(InventoryMovement im) {
        controller.updateBalance();
    }
    
}
