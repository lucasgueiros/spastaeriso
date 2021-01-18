package br.com.pastaeriso.api.purchases.purchase.fake;

import java.math.BigDecimal;
import java.util.List;

import br.com.pastaeriso.api.finances.account.AccountType;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
@Getter
@Setter
@Accessors(fluent = true, chain = true)
public class FakePurchase {

	private FakeProvider provider;
	private FakeNFeXml nfe;
	private BigDecimal additionalValue;
	private FakeTransaction transaction;
	private List<FakePurchaseItem> items;
	
	public FakePurchase item(FakePurchaseItem item) {
		this.items.add(item);
		return this;
	}
	
}
