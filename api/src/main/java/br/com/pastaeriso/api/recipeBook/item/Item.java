package br.com.pastaeriso.api.recipeBook.item;

import java.math.BigDecimal;
import java.util.Map;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import br.com.pastaeriso.api.recipeBook.replacements.NonReplaceableException;
import br.com.pastaeriso.api.recipeBook.input.Input;
import br.com.pastaeriso.api.recipeBook.input.price.InputPrice;
import br.com.pastaeriso.api.recipeBook.unit.Unit;
import br.com.pastaeriso.api.recipeBook.unit.replacement.UnitReplacementMap;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Inheritance
public class Item {

	@Id
	@GeneratedValue
	private Long id;
	@NonNull
	private BigDecimal quantity;
	@NonNull
	@ManyToOne
	private Input input;
	@NonNull
	@ManyToOne
	private Unit unit;
	private String comment;
	@Transient
	@Builder.Default
	private boolean adjusted = false;

	public BigDecimal getCost(UnitReplacementMap replacements, Map<Input, InputPrice> prices)
			throws NonReplaceableException {
		BigDecimal quantity = replacements.toFavorite(this.quantity, this.unit);
		BigDecimal priceByUnit = prices.get(input).getPriceByUnit();
		return priceByUnit.multiply(quantity);
	}

}
