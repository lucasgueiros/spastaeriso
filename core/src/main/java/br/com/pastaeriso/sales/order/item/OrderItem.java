package br.com.pastaeriso.sales.order.item;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import br.com.pastaeriso.products.menu.item.MenuItem;
import br.com.pastaeriso.products.product.Product;
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
@EqualsAndHashCode
@Builder
@NoArgsConstructor
public class OrderItem {
	@Id
	@GeneratedValue
	private Long id;
	private String comments;
}
