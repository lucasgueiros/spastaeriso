package br.com.pastaeriso.purchases.purchase.items;

import java.math.BigDecimal;

import javax.persistence.Entity;

import br.com.pastaeriso.purchases.inventory.InventoryMovement;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
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
@EqualsAndHashCode()
@ToString
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class PurchaseItem  {

    @Id
    @GeneratedValue
    private Long id;
    private String brand;
    @NonNull
    @Column(precision = 25, scale=10)
    private BigDecimal pricePerUnit;

    private String declaredUnit;
    private String declaredInput;
    @Builder.Default
    private Boolean applied = Boolean.FALSE;
    @OneToOne(orphanRemoval = true)
    private InventoryMovement inventoryMovement;
    @Column(precision = 25, scale=10)
    private BigDecimal avgPrice;
}
