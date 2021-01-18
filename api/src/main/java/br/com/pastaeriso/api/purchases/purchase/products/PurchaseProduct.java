package br.com.pastaeriso.api.purchases.purchase.products;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import br.com.pastaeriso.api.recipeBook.input.Input;
import lombok.AllArgsConstructor;
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
public class PurchaseProduct {

	@Id
	@GeneratedValue
	private Integer id;
	@Column(unique = true)
	private String productName;
	@NonNull
	@ManyToOne
	private Input input;
	private String brand;
	
}
