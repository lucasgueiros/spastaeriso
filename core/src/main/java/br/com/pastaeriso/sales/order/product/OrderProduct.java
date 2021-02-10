package br.com.pastaeriso.sales.order.product;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import br.com.pastaeriso.sales.order.item.OrderItem;
import br.com.pastaeriso.products.product.Product;
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
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
public class OrderProduct extends OrderItem {

	@NonNull
	@ManyToOne
	private Product product;
	@NonNull
	private BigDecimal quantity = new BigDecimal(1);

}
