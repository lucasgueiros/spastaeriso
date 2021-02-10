package br.com.pastaeriso.sales.delivery.deliveryman.contract.template;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class ContractTemplate {

	@Id
	@GeneratedValue
	private Long id;

	private BigDecimal paymentForDelivery;
	private BigDecimal minimumCiclePayment;
	private Integer daysPerCycle;

	private String coment;

}
