/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.api.accounting.entry;

import br.com.pastaeriso.accounting.transaction.Entry;
import br.com.pastaeriso.purchases.inventory.InventoryMovement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

/**
 *
 * @author lucas
 */
@Component
@RepositoryEventHandler(Entry.class)
public class EntryEventHandler {
    
    @Autowired
    private EntryController controller;
    
    @HandleAfterCreate
    @HandleAfterSave
    @HandleAfterDelete
    public void handleBeforeCreate(Entry im) {
        controller.updateBalance();
    }
    
}
