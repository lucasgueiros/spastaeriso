/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.products.product;

import br.com.pastaeriso.recipeBook.input.Input;
import br.com.pastaeriso.recipeBook.recipe.Recipe;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
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
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class ProductRecipe {
    @Id
    @GeneratedValue
    private Long id;
    
    @ManyToOne
    private Input output;
    @ManyToOne
    private Recipe recipe;
    
}
