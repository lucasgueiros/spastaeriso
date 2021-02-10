package br.com.pastaeriso.people.person;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import br.com.pastaeriso.accounting.account.Account;
import br.com.pastaeriso.people.address.Address;
import br.com.pastaeriso.people.contact.Contact;
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
	private Long id;
	@NonNull
	private String name;
	@ManyToMany
	private List<Address> addresses;
	@ManyToMany
	private List<Contact> contacts;
	@ManyToOne
	private Address primaryAddress;
	@ManyToOne
	private Contact primaryContact;
	@OneToOne
	private Account account;
	private String comment;
}
