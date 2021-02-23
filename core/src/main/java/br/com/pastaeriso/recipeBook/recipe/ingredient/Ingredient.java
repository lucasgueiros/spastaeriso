package br.com.pastaeriso.recipeBook.recipe.ingredient;

import javax.persistence.Entity;

import br.com.pastaeriso.recipeBook.item.Item;
import br.com.pastaeriso.recipeBook.recipe.Recipe;
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

}
