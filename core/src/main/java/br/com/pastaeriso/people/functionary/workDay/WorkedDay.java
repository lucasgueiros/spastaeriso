/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.people.functionary.workDay;

import br.com.pastaeriso.accounting.transaction.GenericTransaction;
import br.com.pastaeriso.people.functionary.contract.WorkContract;
import br.com.pastaeriso.people.functionary.Functionary;
import java.time.Duration;
import java.time.LocalDateTime;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

/**
 *
 * @author lucas
 */

public class WorkedDay extends GenericTransaction {
    
    @Id
    @GeneratedValue
    private Long id;
    
    private Duration duration;
    
    @ManyToOne
    private Functionary functionary;
    @ManyToOne
    private WorkContract workContract;
    
    private String comment;
    
}
