package br.com.pastaeriso.sales.order;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import br.com.pastaeriso.people.address.Address;
import br.com.pastaeriso.people.person.Person;
import br.com.pastaeriso.sales.order.ClientOrder;
import br.com.pastaeriso.sales.order.item.OrderItem;
import br.com.pastaeriso.sales.order.product.OrderProduct;
import java.math.BigDecimal;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
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
public class DeliveryOrder {

	@Id
	@GeneratedValue
	private Long id;
        @ManyToOne(optional = false)
        @JoinColumn
        private ClientOrder order;
	@OneToMany
	private List<OrderItem> toDelivery;
        @ManyToOne
        private Person clerk;
	@NonNull
	private Integer index = 1;
	@NonNull
	@ManyToOne
	private Address deliveryAddress;
        private BigDecimal price;
        
        private LocalDateTime created = LocalDateTime.now();
        private LocalDateTime ready = LocalDateTime.now();
	private LocalDateTime arrivied;
	
        // Booking Delivery Time
        private LocalDateTime calculatedDeliveryTime;
	private LocalDateTime forecastedDeliveryTime;
	private LocalDateTime requestedDeliveryTime;
        
        private LocalDateTime requestedAt;
        private LocalDateTime approvedAt;
        private LocalDateTime communicatedAt;
        private LocalDateTime acceptedAt;
        private LocalDateTime confirmedAt;
}
        