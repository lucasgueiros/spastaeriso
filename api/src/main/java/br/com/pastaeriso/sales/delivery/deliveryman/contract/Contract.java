package br.com.pastaeriso.sales.delivery.deliveryman.contract;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import br.com.pastaeriso.sales.delivery.deliveryman.contract.template.ContractTemplate;
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
public class Contract {
	@Id
	@GeneratedValue
	private Integer id;
	@NonNull
	@ManyToOne
	private ContractTemplate template;
	@NonNull
	private LocalDate beginDate;
	private LocalDate endDate;
	private String coment;
}
