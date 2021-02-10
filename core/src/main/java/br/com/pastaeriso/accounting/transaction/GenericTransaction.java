package br.com.pastaeriso.accounting.transaction;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import br.com.pastaeriso.accounting.entry.Entry;
import br.com.pastaeriso.accounting.transaction.modality.TransactionModality;
import br.com.pastaeriso.accounting.transaction.type.TransactionType;
import br.com.pastaeriso.accounting.transaction.voucher.TransactionVoucher;
import javax.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.Singular;
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
public class GenericTransaction {

	@Id
	@GeneratedValue
	private Long id;
	private String description;
	@NonNull
	@ManyToOne
	private TransactionModality modality;
	@NonNull
	@ManyToOne
	private TransactionType type;
	@Builder.Default
	private LocalDate date = LocalDateTime.now().toLocalDate();
	@ManyToOne
	private TransactionVoucher voucher;
	@OneToMany
        @Singular
	private List<Entry> entries;
}
