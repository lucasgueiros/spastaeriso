package br.com.pastaeriso.accounting.transaction;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import br.com.pastaeriso.accounting.account.Account;
import br.com.pastaeriso.accounting.transaction.GenericTransaction;
import br.com.pastaeriso.accounting.transaction.modality.TransactionModality;
import java.time.LocalDateTime;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;
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
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"account_id","date"})})
public class Entry {

	@Id
	@GeneratedValue
	private Long id;
	@NonNull
	@ManyToOne
        @JoinColumn(name = "account_id")
	private Account account;
        @Builder.Default
	private LocalDateTime date = LocalDateTime.now();
	@NonNull
	private BigDecimal value;
	private String comment;
        private BigDecimal balance;
        
}
