package br.com.pastaeriso.api.accounting.entry;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import br.com.pastaeriso.api.accounting.account.Account;
import br.com.pastaeriso.api.accounting.transaction.Transaction;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
@Builder
public class Entry {

	@Id
	@GeneratedValue
	private Long id;
	@ManyToOne
	@Column(nullable = false)
	private Transaction transaction;
	@NonNull
	@ManyToOne
	private Account account;
	@NonNull
	private BigDecimal value;
	@NonNull
	@Builder.Default
	private LocalDate date = LocalDate.now();
	private String comment;
	
}
