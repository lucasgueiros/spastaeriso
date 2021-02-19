/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.api.accounting.entry;

import br.com.pastaeriso.accounting.account.Account;
import br.com.pastaeriso.accounting.transaction.Entry;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author lucas
 */
@RestController
@CrossOrigin
public class EntryController {
    
    @Autowired
    private EntryRepository repository;
    
    @GetMapping("/entries/balance")
    public Map<String,BigDecimal> balance() {
        return null;
    }
    
    public Map<Account,BigDecimal> updateBalance() {
        Map<Account,BigDecimal> balance = new HashMap<>();
        
        //List<Entry> entries = repository.findAllByOrderByDate();
        
        return null;
    }
    
}
