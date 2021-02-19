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
import javax.persistence.Transient;
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
	@NonNull
	@ManyToOne
	private Account account;
        @Builder.Default
	private LocalDate date = LocalDateTime.now().toLocalDate();
	@NonNull
	private BigDecimal value;
	private String comment;
        private BigDecimal balance;
        
}
