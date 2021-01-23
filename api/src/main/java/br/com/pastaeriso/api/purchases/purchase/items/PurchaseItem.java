package br.com.pastaeriso.api.purchases.purchase.items;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import br.com.pastaeriso.api.purchases.inventory.InventoryMovement;
import br.com.pastaeriso.api.recipeBook.unit.Unit;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
@Builder
public class PurchaseItem {

	@Id
	@GeneratedValue
	private Long id;
	private String brand;
	@NonNull
	private BigDecimal pricePerUnit;
	@ManyToOne
	private Unit unit;
	private String description;
	@NonNull
	@OneToOne
	private InventoryMovement inventoryMovement;

}
