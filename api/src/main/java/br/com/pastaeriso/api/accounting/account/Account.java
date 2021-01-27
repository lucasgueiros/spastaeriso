package br.com.pastaeriso.api.accounting.account;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

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
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
public class Account {

	@Id
	@GeneratedValue
	private Long id;
	@NonNull
	@Column(unique = true)
	private String name;
	private LocalDate created = LocalDate.now();
	private String comment;
	@ManyToOne
	private Account motherAccount;
}
