package br.com.pastaeriso.recipeBook.recipe.ingredient;

import org.springframework.data.rest.core.config.Projection;

import br.com.pastaeriso.recipeBook.item.ItemDetails;

@Projection(types = { Ingredient.class })
public interface IngredientDetails extends ItemDetails {

	public Integer getIndex();
	
}
