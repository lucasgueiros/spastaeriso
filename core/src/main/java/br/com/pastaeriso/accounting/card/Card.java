package br.com.pastaeriso.accounting.card;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import br.com.pastaeriso.accounting.account.Account;
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
public class Card {

	@Id
	@GeneratedValue
	private Long id;
	@NonNull
	@OneToOne
	private Account account;
	/**
	 * CNPJ do fornecedor do cartao
	 */
	private String cnpj;
	private boolean favorite;
	
}
