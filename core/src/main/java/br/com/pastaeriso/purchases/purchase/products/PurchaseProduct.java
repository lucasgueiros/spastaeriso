package br.com.pastaeriso.purchases.purchase.products;

import br.com.pastaeriso.purchases.inventory.InventoryMovement;
import br.com.pastaeriso.purchases.purchase.items.PurchaseItem;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import br.com.pastaeriso.recipeBook.input.Input;
import br.com.pastaeriso.recipeBook.unit.Unit;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PurchaseProduct {

	@Id
	@GeneratedValue
	private Long id;
	private String declaredInput;
	private String declaredUnit;
        @Builder.Default
        private boolean keepUnit = true;
        @Builder.Default
        @Column(precision = 25, scale=10)
        private BigDecimal ratio = BigDecimal.ONE;
	@NonNull
	@ManyToOne
	private Input input;
        @NonNull
	@ManyToOne
	private Unit unit;
	private String brand;
        @Builder.Default
        private Boolean applied = Boolean.FALSE;
        
        public PurchaseItem toPurchaseItem (LocalDateTime date, BigDecimal quantity, BigDecimal pricePerUnit) {
            if(!this.keepUnit) {
                quantity = quantity.multiply(ratio);
                pricePerUnit = pricePerUnit.divide(ratio);
            }
            return PurchaseItem.builder()
                    .inventoryMovement(InventoryMovement.builder()
                            .input(this.input)
                            .unit(this.unit)
                            .adjusted(false)
                            .comment(this.declaredInput + "(" + this.declaredUnit + ")")
                            .date(date)
                            .quantity(quantity)
                    .build())
                    .applied(Boolean.FALSE)
                    .declaredInput(declaredInput)
                    .declaredUnit(declaredUnit)
                    .brand(this.brand)
                    .pricePerUnit(pricePerUnit)
                    .build();
            
        }

    public boolean appliesTo(PurchaseItem item) {
        return this.declaredInput.equals(item.getDeclaredInput()) && this.declaredUnit.equals(item.getDeclaredUnit());
    }

    public PurchaseItem apply(PurchaseItem item) {
        BigDecimal quantity = item.getInventoryMovement().getQuantity();
        BigDecimal pricePerUnit = item.getPricePerUnit();
        Unit unit = item.getInventoryMovement().getUnit();
        if(!this.keepUnit) {
                quantity = quantity.multiply(ratio);
                pricePerUnit = pricePerUnit.divide(ratio, 10, RoundingMode.HALF_UP);
                unit = this.unit;
            }
            return PurchaseItem.builder()
                    .id(item.getId())
                    .brand(this.brand)
                    .inventoryMovement(InventoryMovement.builder()
                            .input(this.input)
                            .unit(unit)
                            .adjusted(false)
                            .comment(declaredInput)
                            .date(item.getInventoryMovement().getDate())
                            .quantity(quantity)
                            .build())
                    .pricePerUnit(pricePerUnit)
                    .build();
    }

}
