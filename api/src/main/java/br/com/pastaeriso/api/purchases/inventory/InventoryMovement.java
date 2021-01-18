package br.com.pastaeriso.api.purchases.inventory;

import java.time.LocalDate;

import javax.persistence.Entity;

import br.com.pastaeriso.api.recipeBook.item.Item;
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
@Builder
public class InventoryMovement extends Item {

	@NonNull
	@Builder.Default
	private LocalDate date = LocalDate.now();

}
