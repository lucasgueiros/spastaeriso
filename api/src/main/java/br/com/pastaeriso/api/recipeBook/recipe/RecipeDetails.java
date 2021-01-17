package br.com.pastaeriso.api.recipeBook.recipe;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.rest.core.config.Projection;

import br.com.pastaeriso.api.recipeBook.item.Item;
import br.com.pastaeriso.api.recipeBook.recipe.ingredient.Ingredient;
import br.com.pastaeriso.api.recipeBook.recipe.intruction.Instruction;

@Projection(types = { Recipe.class })
public interface RecipeDetails {
	
	public String getTitle();
	public LocalDate getData();
	public Integer getPreparationTime();
	public Integer getTotalTime();
	public List<Ingredient> getIngredients();
	public List<Instruction> getInstructions();
	public List<Item> getOtherItems();
	public Item getOutput();

}
