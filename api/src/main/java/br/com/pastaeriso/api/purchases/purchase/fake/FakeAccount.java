package br.com.pastaeriso.api.purchases.purchase.fake;

import br.com.pastaeriso.api.finances.account.AccountType;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Accessors(fluent = true, chain = true)
@Getter
@Setter
public class FakeAccount {

	private Integer id;
	private String name;
	private String comment;
	private AccountType type;
	
}
