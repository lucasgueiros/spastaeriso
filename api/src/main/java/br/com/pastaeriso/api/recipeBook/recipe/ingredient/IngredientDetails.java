package br.com.pastaeriso.api.recipeBook.recipe.ingredient;

import org.springframework.data.rest.core.config.Projection;

import br.com.pastaeriso.api.recipeBook.item.ItemDetails;
import br.com.pastaeriso.recipeBook.recipe.ingredient.Ingredient;

@Projection(types = { Ingredient.class })
public interface IngredientDetails extends ItemDetails {

	public Integer getIndex();
	
}
