package br.com.pastaeriso.api.finances.transaction;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import br.com.pastaeriso.api.finances.account.Account;
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
public class Transaction {

	@Id
	@GeneratedValue
	private Integer id;
	@NonNull
	@ManyToOne
	private Account account;
	@NonNull
	private BigDecimal value;
	@NonNull
	private LocalDate date = LocalDate.now();
	private String comment;
	@NonNull
	@Enumerated(EnumType.STRING)
	private TransactionType type;
	@NonNull
	@Enumerated(EnumType.STRING)
	private TransactionModel mode;
	@Lob
	private byte[] voucher;
}
