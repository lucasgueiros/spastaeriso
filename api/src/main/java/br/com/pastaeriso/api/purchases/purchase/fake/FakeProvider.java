package br.com.pastaeriso.api.purchases.purchase.fake;

import javax.persistence.Column;

import br.com.pastaeriso.api.finances.account.AccountType;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
@Getter
@Setter
@Accessors(fluent = true, chain = true)
public class FakeProvider {

	private String name;
	private String comment;
	private String cnpj;
	
}
