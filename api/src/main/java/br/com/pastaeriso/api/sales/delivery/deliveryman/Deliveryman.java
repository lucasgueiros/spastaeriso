package br.com.pastaeriso.api.sales.delivery.deliveryman;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import br.com.pastaeriso.api.generics.person.Person;
import br.com.pastaeriso.api.sales.delivery.deliveryman.contract.template.ContractTemplate;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@ToString
@NoArgsConstructor
@SuperBuilder
public class Deliveryman extends Person {

	@ManyToOne
	public ContractTemplate contract;

}
