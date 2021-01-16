package br.com.pastaeriso.recipeBook.input.price;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import br.com.pastaeriso.recipeBook.input.Input;
import br.com.pastaeriso.recipeBook.unit.Unit;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
public class InputPrice {

	@Id
	@GeneratedValue
	private Integer id;
	@NonNull
	@ManyToOne
	private Input input;
	@NonNull
	private BigDecimal priceByUnit;
	@NonNull
	@ManyToOne
	private Unit unit;

}
