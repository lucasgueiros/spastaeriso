package br.com.pastaeriso.purchases.purchase.items;

import java.math.BigDecimal;

import javax.persistence.Entity;

import br.com.pastaeriso.purchases.inventory.InventoryMovement;
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
@EqualsAndHashCode(callSuper = true)
@ToString
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class PurchaseItem extends InventoryMovement {

	private String brand;
	@NonNull
	private BigDecimal pricePerUnit;

        private String declaredUnit;
        private String declaredInput;
        @Builder.Default
        private Boolean applied = Boolean.FALSE;
}
