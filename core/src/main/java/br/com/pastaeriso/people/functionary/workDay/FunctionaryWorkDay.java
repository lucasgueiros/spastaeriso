/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.people.functionary.workDay;

import br.com.pastaeriso.accounting.transaction.GenericTransaction;
import br.com.pastaeriso.people.functionary.contract.FunctionaryContract;
import br.com.pastaeriso.people.functionary.Functionary;
import java.time.Duration;
import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

/**
 *
 * @author lucas
 */
@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@SuperBuilder
public class FunctionaryWorkDay extends GenericTransaction {
    
    @Id
    @GeneratedValue
    private Long id;
    
    private Duration duration;
    
    @ManyToOne
    private Functionary functionary;
    @ManyToOne
    private FunctionaryContract workContract;
    
    private String comment;
    
}
