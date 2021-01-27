package br.com.pastaeriso.api.recipeBook.input.replacement;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import br.com.pastaeriso.api.recipeBook.replacements.Replacement;
import br.com.pastaeriso.api.recipeBook.input.Input;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class InputReplacement implements Replacement<Input> {
	@Id
	@GeneratedValue
	private Long id;

	@NonNull
	@ManyToOne
	private Input from;
	@NonNull
	@ManyToOne
	private Input to;
	@NonNull
	private BigDecimal proportion;
}
