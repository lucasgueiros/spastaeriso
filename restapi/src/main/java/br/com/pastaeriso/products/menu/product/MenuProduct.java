package br.com.pastaeriso.products.menu.product;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import br.com.pastaeriso.products.menu.item.MenuItem;
import br.com.pastaeriso.products.product.Product;
import lombok.AllArgsConstructor;
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
public class MenuProduct extends MenuItem {
	@ManyToOne
	@NonNull
	private Product product;
}
