package br.com.pastaeriso.purchases.inventory;

import java.time.LocalDate;

import javax.persistence.Entity;

import br.com.pastaeriso.recipeBook.item.Item;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;
import javax.persistence.Column;
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
//@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"input_id","date"})})
public class InventoryMovement extends Item {

	@NonNull
	@Builder.Default
	private LocalDateTime date = LocalDateTime.now();
        @Column(precision = 25, scale=10)
        private BigDecimal checkedBalance;
        @Column(precision = 25, scale=10)
        private BigDecimal calculatedBalance;

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 79 * hash + Objects.hashCode(super.getId());
        hash = 79 * hash + Objects.hashCode(super.getQuantity());
        hash = 79 * hash + Objects.hashCode(super.getInput());
        hash = 79 * hash + Objects.hashCode(super.getUnit());
        hash = 79 * hash + Objects.hashCode(super.getComment());
        hash = 79 * hash + (super.isAdjusted() ? 1 : 0);
        hash = 47 * hash + Objects.hashCode(this.date);
        hash = 47 * hash + Objects.hashCode(this.checkedBalance);
        hash = 47 * hash + Objects.hashCode(this.calculatedBalance);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final InventoryMovement other = (InventoryMovement) obj;
        if (!Objects.equals(this.date, other.date)) {
            return false;
        }
        if (!Objects.equals(this.checkedBalance, other.checkedBalance)) {
            return false;
        }
        if (!Objects.equals(this.calculatedBalance, other.calculatedBalance)) {
            return false;
        }
        return true;
    }

}
