package br.com.pastaeriso.sales.delivery.deliveryman.contract;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import br.com.pastaeriso.people.person.Person;
import br.com.pastaeriso.sales.delivery.deliveryman.Deliveryman;
import java.math.BigDecimal;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class DeliverymanContract {
	@Id
	@GeneratedValue
	private Long id;
        
	@NonNull
	private LocalDate start;
	private LocalDate end;
        
        private BigDecimal paymentForDelivery;
	private BigDecimal minimumCiclePayment;
	private Integer daysPerCycle;
        
	private String coment;
        
	@ManyToOne
	private Deliveryman deliveryman;
}
