package br.com.pastaeriso.api.recipeBook.unit.replacement;

import java.math.BigDecimal;
import java.util.Map;

import br.com.pastaeriso.api.recipeBook.unit.Quantity;
import br.com.pastaeriso.api.recipeBook.unit.Unit;
import lombok.Setter;

@Setter
public class UnitReplacementMap {

	private Map<Quantity, Unit> favorites;
	private Map<Unit, UnitReplacement> replacements;

	public Unit getFavorite(Unit unit) {
		return favorites.get(unit.getQuantity());
	}

	public BigDecimal toFavorite(BigDecimal quantity, Unit from) {
		return quantity.multiply(replacements.get(from).getProportion());
	}

}
