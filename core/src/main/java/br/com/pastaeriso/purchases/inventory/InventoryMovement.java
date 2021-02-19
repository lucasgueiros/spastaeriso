package br.com.pastaeriso.purchases.inventory;

import java.time.LocalDate;

import javax.persistence.Entity;

import br.com.pastaeriso.recipeBook.item.Item;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class InventoryMovement extends Item {

	@NonNull
	@Builder.Default
	private LocalDate date = LocalDate.now();
        private BigDecimal checkedBalance;
        private BigDecimal calculatedBalance;

}
