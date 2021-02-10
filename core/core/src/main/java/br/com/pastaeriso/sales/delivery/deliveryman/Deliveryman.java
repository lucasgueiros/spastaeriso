package br.com.pastaeriso.sales.delivery.deliveryman;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Enumerated;

import br.com.pastaeriso.people.person.Person;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import java.time.DayOfWeek;
import java.util.List;

@Entity
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@ToString
@NoArgsConstructor
@SuperBuilder
public class Deliveryman extends Person {

	@Column
	@Enumerated
	@ElementCollection(targetClass = DayOfWeek.class)
	public List<DayOfWeek> avaliableDays;

}
