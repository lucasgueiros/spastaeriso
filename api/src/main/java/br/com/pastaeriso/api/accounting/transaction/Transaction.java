package br.com.pastaeriso.api.accounting.transaction;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import br.com.pastaeriso.api.accounting.account.Account;
import br.com.pastaeriso.api.accounting.entry.Entry;
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
public class Transaction {

	@Id
	@GeneratedValue
	private Long id;
	@OneToMany
	private List<Entry> entries;
	private String comment;
	@NonNull
	@Enumerated(EnumType.STRING)
	private TransactionType type;
	@NonNull
	@Enumerated(EnumType.STRING)
	private TransactionModality modality;
	@Lob
	private byte[] voucher;
}
