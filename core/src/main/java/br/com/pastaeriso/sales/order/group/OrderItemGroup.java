package br.com.pastaeriso.sales.order.group;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import br.com.pastaeriso.sales.order.item.OrderItem;
import br.com.pastaeriso.sales.order.product.OrderProduct;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@ToString
@NoArgsConstructor
@RequiredArgsConstructor
public class OrderItemGroup extends OrderItem {

	@NonNull
	@OneToMany
	private List<OrderItem> items;

}
