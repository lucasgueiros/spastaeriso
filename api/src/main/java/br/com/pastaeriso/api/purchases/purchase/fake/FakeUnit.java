package br.com.pastaeriso.api.purchases.purchase.fake;

import br.com.pastaeriso.api.recipeBook.unit.Quantity;
import br.com.pastaeriso.api.recipeBook.unit.Unit;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
@Getter
@Setter
@Accessors(fluent = true, chain = true)
@NoArgsConstructor
public class FakeUnit {

	private Integer id;
	private String name;
	private Quantity quantity;
	
	public FakeUnit(Unit unit) {
		this.id = unit.getId();
		this.name = unit.getName();
		this.quantity = unit.getQuantity();
	}
	
}
