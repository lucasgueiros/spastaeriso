/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.people.functionary.payment;

import br.com.pastaeriso.accounting.transaction.GenericTransaction;
import br.com.pastaeriso.people.functionary.workDay.FunctionaryWorkDay;
import br.com.pastaeriso.people.functionary.Functionary;
import java.time.LocalDate;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

/**
 *
 * @author lucas
 */
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@SuperBuilder
public class FunctionaryPayment {
    
    @Id
    @GeneratedValue
    private Long id;
    @OneToOne
    private GenericTransaction transaction;
    @ManyToOne
    private Functionary functionary;
    @OneToMany
    private List<FunctionaryWorkDay> days;
    
}
