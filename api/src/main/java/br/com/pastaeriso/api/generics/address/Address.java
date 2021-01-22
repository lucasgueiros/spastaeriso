package br.com.pastaeriso.api.generics.address;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import br.com.pastaeriso.api.generics.address.neighborhoods.Neighborhood;
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
public class Address {

	@Id
	@GeneratedValue
	private Integer id;
	@NonNull
	private String name = "principal";
	private String localName;
	private String street;
	private String number;
	@ManyToOne
	private Neighborhood neighborhood;
	private String complement;
	private String reference;
	private String comments;
	@NonNull
	@Enumerated(EnumType.STRING)
	private AddressType type;

}
