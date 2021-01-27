package br.com.pastaeriso.api.sales.delivery;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import br.com.pastaeriso.api.sales.delivery.deliveryman.Deliveryman;
import br.com.pastaeriso.api.sales.delivery.orderToDelivery.OrderToDelivery;
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
public class Delivery {

	@Id
	@GeneratedValue
	private Long id;
	@NonNull
	@ManyToOne
	private Deliveryman deliveryman;
	private LocalDateTime exited;
	private LocalDateTime cameBack;
	private LocalDateTime called;
	@OneToMany
	private List<OrderToDelivery> orders;

}
