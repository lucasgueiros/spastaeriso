package br.com.pastaeriso.api.purchases.purchase.fake;

import br.com.pastaeriso.api.recipeBook.input.Input;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
@Getter
@Setter
@Accessors(fluent = true, chain = true)
@NoArgsConstructor
public class FakeInput {

	private String name;
	private String comment;
	private Integer id;
	
	public FakeInput(Input o) {
		this.id = o.getId();
		this.name = o.getName();
		this.comment = o.getComment();
	}
	
}
