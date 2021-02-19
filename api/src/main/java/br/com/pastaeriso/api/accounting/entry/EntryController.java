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
import java.util.LinkedList;
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
    
    private class Result {
        public String account;
        public BigDecimal balance;
    }
    
    @GetMapping("/entries/balance")
    public List<Result> balance() {
        Map<Account,BigDecimal> balances = updateBalance();
        List<Result> results = new LinkedList<>();
        BigDecimal balance = BigDecimal.ZERO;
        for(Account a : balances.keySet()) {
            balance = balance.add(balances.get(a));
            
            Result r = new Result();
            r.account = a.getName();
            r.balance = balances.get(a);
            
            results.add(r);
        }
        
        Result r = new Result();
        r.account = "Balance";
        r.balance = balance;
        results.add(r);
        return results;
    }
    
    public Map<Account,BigDecimal> updateBalance() {
        Map<Account,BigDecimal> balances = new HashMap<>();
        
        List<Entry> entries = repository.findAllByOrderByDate();
        for(Entry entry : entries) {
            if(balances.containsKey(entry.getAccount())) {
                BigDecimal balance = balances.get(entry.getAccount());
                balance = balance.add(entry.getValue());
                entry.setBalance(balance);
                repository.save(entry);
                balances.put(entry.getAccount(), balance);
            } else {
                balances.put(entry.getAccount(), entry.getValue());
                entry.setBalance(entry.getValue());
                repository.save(entry);
            }
        }
        
        return balances;
    }
    
}
