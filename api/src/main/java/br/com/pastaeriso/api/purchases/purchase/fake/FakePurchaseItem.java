package br.com.pastaeriso.api.purchases.purchase.fake;

import java.math.BigDecimal;

import br.com.pastaeriso.api.finances.account.AccountType;
import br.com.pastaeriso.api.recipeBook.unit.Unit;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
@Getter
@Setter
@Accessors(fluent = true, chain = true)
public class FakePurchaseItem {

	private String brand;
	private BigDecimal pricePerUnit;
	private FakeUnit unit;
	private String description;
	private FakeInventoryMovement inventoryMovement;
	
}
