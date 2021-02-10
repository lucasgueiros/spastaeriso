package br.com.pastaeriso.purchases.purchase.products;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import br.com.pastaeriso.recipeBook.input.Input;
import br.com.pastaeriso.recipeBook.unit.Unit;
import java.math.BigDecimal;
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
	@Column(unique = true)
	private String declaredInputName;
        private String declaredUnitName;
	
        private boolean keepUnit;
        
        @NonNull
	@ManyToOne
	private Unit unit;
        private BigDecimal ratio;
        @NonNull
	@ManyToOne
        private Input input;
	private String brand;
	
}
