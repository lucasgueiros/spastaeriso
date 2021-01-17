package br.com.pastaeriso.api.sales.delivery.deliveryman.contract.template;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

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
public class ContractTemplate {

	@Id
	@GeneratedValue
	private Integer id;
	@NonNull
	@Enumerated(EnumType.STRING)
	private ContractType type;

	private BigDecimal paymentForDelivery;
	private BigDecimal minimumDailyPayment;

	private String coment;

}
