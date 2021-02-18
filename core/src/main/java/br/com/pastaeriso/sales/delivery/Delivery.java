package br.com.pastaeriso.sales.delivery;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import br.com.pastaeriso.sales.delivery.deliveryman.Deliveryman;
import br.com.pastaeriso.sales.order.DeliveryOrder;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Delivery {

	@Id
	@GeneratedValue
	private Long id;
	@ManyToOne
	private Deliveryman deliveryman;
        
        private LocalDateTime called;
	private LocalDateTime exited;
	private LocalDateTime cameBack;
	
	@OneToMany
	private List<DeliveryOrder> orders;
        
        private String comment;

}
