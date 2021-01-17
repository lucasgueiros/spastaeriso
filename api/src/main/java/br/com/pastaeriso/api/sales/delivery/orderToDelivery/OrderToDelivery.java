package br.com.pastaeriso.api.sales.delivery.orderToDelivery;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import br.com.pastaeriso.api.generics.address.Address;
import br.com.pastaeriso.api.sales.order.ClientOrder;
import br.com.pastaeriso.api.sales.order.item.OrderItem;
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
public class OrderToDelivery {

	@Id
	@GeneratedValue
	private Integer id;
	@NonNull
	@ManyToOne
	private ClientOrder order;
	@OneToMany
	private List<OrderItem> toDelivery;
	@NonNull
	private Integer index = 1;
	@NonNull
	@ManyToOne
	private Address deliveryAddress;
	@NonNull
	@Enumerated(EnumType.STRING)
	private OrderToDeliveryStatus status = OrderToDeliveryStatus.READY;
	private LocalDateTime arrivied;
	@NonNull
	private LocalDateTime arriveForecast;

}
