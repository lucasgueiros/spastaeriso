package br.com.pastaeriso.purchases.inventory;

import java.time.LocalDate;

import javax.persistence.Entity;

import br.com.pastaeriso.recipeBook.item.Item;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
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
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"input_id","date"})})
public class InventoryMovement extends Item {

	@NonNull
	@Builder.Default
	private LocalDateTime date = LocalDateTime.now();
        private BigDecimal checkedBalance;
        private BigDecimal calculatedBalance;

}
