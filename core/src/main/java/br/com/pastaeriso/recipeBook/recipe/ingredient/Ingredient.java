/* 
 * The MIT License
 *
 * Copyright 2021 Lucas Dantas Gueiros.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
package br.com.pastaeriso.recipeBook.recipe.ingredient;

import javax.persistence.Entity;

import br.com.pastaeriso.recipeBook.item.Item;
import br.com.pastaeriso.recipeBook.recipe.Recipe;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class Ingredient extends Item {

	private Integer index;
        
        @OneToMany
        private List<IngredientReplacement> replacements;
        
        @ManyToOne(optional = true)
        private Recipe recipe;
        
        @Builder.Default
        private Boolean showWithIngredients = true;

        public Ingredient adjust(BigDecimal ratio) {
            BigDecimal times = ratio.divide(super.getRatio(), 10, RoundingMode.CEILING);
            return Ingredient.builder()
                    .index(index)
                    .replacements(replacements)
                    .recipe(recipe)
                    .showWithIngredients(showWithIngredients)
                    .input(this.getInput())
                    .unit(this.getUnit())
                    .comment(this.getComment())
                    .quantity(this.getQuantity().multiply(times))
                    .ratio(ratio)
                    .build();
        }
        
}
