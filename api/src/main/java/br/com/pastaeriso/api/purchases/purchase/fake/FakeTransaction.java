package br.com.pastaeriso.api.purchases.purchase.fake;

import java.math.BigDecimal;
import java.time.LocalDate;

import br.com.pastaeriso.api.finances.account.AccountType;
import br.com.pastaeriso.api.finances.transaction.TransactionModality;
import br.com.pastaeriso.api.finances.transaction.TransactionType;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
@Getter
@Setter
@Accessors(fluent = true, chain = true)
public class FakeTransaction {

	private FakeAccount account;
	private BigDecimal value;
	private LocalDate date = LocalDate.now();
	private String comment;
	private TransactionType type;
	private TransactionModality modality;
	
}
