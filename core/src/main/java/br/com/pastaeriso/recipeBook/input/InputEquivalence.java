/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.recipeBook.input;

import br.com.pastaeriso.recipeBook.unit.Unit;
import java.math.BigDecimal;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 *
 * @author lucas
 */
@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class InputEquivalence {
    
    @Id
    @GeneratedValue
    private Long id;
    
    private BigDecimal ratio;
    
    @ManyToOne(optional = false)
    private Unit unitA;
    @ManyToOne(optional = false)
    private Unit unitB;
    
    @ManyToOne(optional = true)
    private Input inputA;
    @ManyToOne(optional = true)
    private Input inputB;
    
}
