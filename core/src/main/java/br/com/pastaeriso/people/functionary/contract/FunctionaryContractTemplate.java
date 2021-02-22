/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.people.functionary.contract;

import br.com.pastaeriso.people.functionary.function.FunctionaryFunction;
import java.math.BigDecimal;
import java.time.LocalDate;
import javax.persistence.Column;
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
public class FunctionaryContractTemplate {
    
    @Id
    @GeneratedValue
    private Long id;
    
    @Column(precision = 25, scale=10)
    private BigDecimal monthSalary;
    @Column(precision = 25, scale=10)
    private BigDecimal hourSalary;
    
    private LocalDate date;
    
    @ManyToOne
    private FunctionaryFunction function;
    
    private String comment;
    
}
