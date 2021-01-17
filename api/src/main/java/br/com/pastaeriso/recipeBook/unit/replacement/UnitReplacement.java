package br.com.pastaeriso.recipeBook.unit.replacement;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import br.com.pastaeriso.generics.replacements.Replacement;
import br.com.pastaeriso.recipeBook.unit.Unit;
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
public class UnitReplacement implements Replacement<Unit> {

	@Id
	@GeneratedValue
	private Integer id;

	@NonNull
	@ManyToOne
	private Unit from;
	@NonNull
	@ManyToOne
	private Unit to;
	@NonNull
	private BigDecimal proportion;

}
