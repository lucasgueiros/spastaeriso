package br.com.pastaeriso.api.recipeBook.input.price;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import br.com.pastaeriso.api.recipeBook.input.Input;
import br.com.pastaeriso.api.recipeBook.unit.Unit;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * Só é usado pelo sistema quando não há nenhuma entrada desse insumo nas compras.
 * Usa a entrada mais nova nesse caso.
 * @author lucas
 *
 */
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
	private LocalDate date;
	@NonNull
	@ManyToOne
	private Unit unit;

}
