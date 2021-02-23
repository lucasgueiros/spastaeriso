/* 
 * The MIT License
 *
 * Copyright 2021 Lucas Dantas Gueiros.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
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
