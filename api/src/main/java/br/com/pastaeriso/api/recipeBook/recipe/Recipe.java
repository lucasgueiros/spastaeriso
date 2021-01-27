package br.com.pastaeriso.api.recipeBook.recipe;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import br.com.pastaeriso.api.recipeBook.replacements.NonReplaceableException;
import br.com.pastaeriso.api.recipeBook.input.Input;
import br.com.pastaeriso.api.recipeBook.input.price.InputPrice;
import br.com.pastaeriso.api.recipeBook.item.Item;
import br.com.pastaeriso.api.recipeBook.recipe.ingredient.Ingredient;
import br.com.pastaeriso.api.recipeBook.recipe.intruction.Instruction;
import br.com.pastaeriso.api.recipeBook.unit.Unit;
import br.com.pastaeriso.api.recipeBook.unit.replacement.UnitReplacementMap;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
public class Recipe {

	@Id
	@GeneratedValue
	private Long id;
	@NonNull
	private String title;
	@NonNull
	private LocalDate data = LocalDate.now();

	private Integer preparationTime;
	private Integer totalTime;

	@OneToMany
	private List<Ingredient> ingredients;
	@OneToMany
	private List<Instruction> instructions;
	@OneToMany
	private List<Item> otherItems;

	// @NonNull
	@ManyToOne
	private Item output;

	@Transient
	public boolean adjusted = false;

	public BigDecimal getCost(@NonNull BigDecimal quantity, @NonNull Unit unit, UnitReplacementMap replacements,
			Map<Input, Recipe> handcrafted, Map<Input, InputPrice> prices) throws NonReplaceableException {
		// se e a mesma unidade, nao preciso proporcionar a receita toda
		if (this.output.getUnit().equals(unit)) {
			BigDecimal cost = new BigDecimal(0);
			for (Ingredient ingredient : ingredients) {
				if (handcrafted.containsKey(ingredient.getInput())) {
					cost = cost.add(handcrafted.get(ingredient.getInput()).getCost(ingredient.getQuantity(),
							ingredient.getUnit(), replacements, handcrafted, prices));
				} else {
					cost = cost.add(ingredient.getCost(replacements, prices));
				}
			}
			for (Item item : otherItems) {
				cost = cost.add(item.getCost(replacements, prices));
			}
			return cost;
		} else {
			return new BigDecimal(0);
		}
	}

}
