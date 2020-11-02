package br.com.pastaeriso.web.generics.person;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import br.com.pastaeriso.web.generics.address.Address;
import br.com.pastaeriso.web.generics.contact.Contact;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Inheritance
public class Person {

	@Id
	@GeneratedValue
	private Integer id;
	@NonNull
	private String nome;
	@ManyToMany
	private List<Address> addresses;
	@ManyToMany
	private List<Contact> contacts;
	@ManyToOne
	private Address primaryAddress;
	@ManyToOne
	private Contact privaryContact;
}
