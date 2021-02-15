/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.people.functionary.contract;

import br.com.pastaeriso.people.functionary.Functionary;
import br.com.pastaeriso.people.functionary.function.FunctionaryFunction;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
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
public class FunctionaryContract {
    
    @Id
    @GeneratedValue
    private Long id;
    
    private BigDecimal monthSalary;
    private BigDecimal hourSalary;
    
    private LocalDate startDate;
    private LocalDate endDate;
    
    @ManyToOne
    private Functionary functionary;
    @ManyToMany
    private List<FunctionaryFunction> functions;
    
    private String comment;
    
}
