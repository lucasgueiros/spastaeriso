package br.com.pastaeriso.web.purchases.purchase.items;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import br.com.pastaeriso.web.purchases.inventory.IventoryMovement;
import br.com.pastaeriso.web.recipeBook.unit.Unit;
import lombok.AllArgsConstructor;
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
public class PurchaseItem {

	@Id
	@GeneratedValue
	private Integer id;
	private String brand;
	private BigDecimal pricePerUnit;
	@ManyToOne
	private Unit unit;
	private String description;
	private String productName;
	private Integer productCode;
	@NonNull
	@OneToOne
	private IventoryMovement iventoryMovement;

}
