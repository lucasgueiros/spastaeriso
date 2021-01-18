package br.com.pastaeriso.api.purchases.purchase.fake;

import java.math.BigDecimal;
import java.time.LocalDate;

import br.com.pastaeriso.api.finances.account.AccountType;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
@Getter
@Setter
@Accessors(fluent = true, chain = true)
public class FakeInventoryMovement {

	private BigDecimal quantity;
	private FakeInput input;
	private FakeUnit unit;
	private String comment;
	private LocalDate date = LocalDate.now();
	
}
