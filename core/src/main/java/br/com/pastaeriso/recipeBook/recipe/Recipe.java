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
package br.com.pastaeriso.recipeBook.recipe;

import br.com.pastaeriso.people.functionary.workingTime.FunctionaryWorkingTime;
import java.time.LocalDate;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import br.com.pastaeriso.recipeBook.item.Item;
import br.com.pastaeriso.recipeBook.recipe.ingredient.Ingredient;
import br.com.pastaeriso.recipeBook.recipe.intruction.Instruction;
import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.LinkedList;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.Singular;
import lombok.ToString;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class Recipe {

    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String title;
    
    @NonNull
    @Builder.Default
    private LocalDate revision = LocalDate.now();
    @Builder.Default
    private String version = "Padrão";
    
    private String comment;

    private Integer totalTime;

    @OneToMany
    @Singular
    private List<Instruction> instructions;

    @OneToMany
    @Singular
    private List<FunctionaryWorkingTime> works;
    @OneToMany
    @Singular
    private List<Ingredient> ingredients;
    @OneToMany
    @Singular
    private List<Item> outputs;

    public String getUniqueTitle() {
        return title + " " + version + " (" + revision.format(DateTimeFormatter.ISO_DATE) + ")";
    }
    
    @Transient
    @Builder.Default
    public BigDecimal ratio = BigDecimal.ONE;
    
    public Recipe adjust(BigDecimal ratio) {
        
        List<FunctionaryWorkingTime> works = new LinkedList<>();
        for(FunctionaryWorkingTime fwt : this.works) {
            works.add(fwt.adjust(ratio));
        }
        
        List<Ingredient> ingredients = new LinkedList<>();
        for(Ingredient ingredient : this.ingredients) {
            ingredients.add(ingredient.adjust(ratio));
        }
        
        List<Item> outputs = new LinkedList<>();
        for(Item item : this.outputs) {
            outputs.add(item.adjust(ratio));
        }
        
        return Recipe.builder()
                .title(this.title)
                .revision(this.revision)
                .version(version)
                .comment(comment)
                .totalTime(totalTime)
                .instructions(instructions)
                .ratio(ratio)
                .works(works)
                .ingredients(ingredients)
                .outputs(outputs)
                .build();
    }
    
}
