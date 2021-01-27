package br.com.pastaeriso.api.accounting.transaction;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.com.pastaeriso.api.accounting.entry.Entry;
import br.com.pastaeriso.api.accounting.transaction.modality.TransactionModality;
import br.com.pastaeriso.api.accounting.transaction.type.TransactionType;
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
	// TODO @NonNull
	private String description;
	@NonNull
	@ManyToOne
	private TransactionModality modality;
	@NonNull
	@ManyToOne
	private TransactionType type;
	//@JsonFormat(pattern="yyyy-MM-dd'T'hh:mm:ss")
	//@DateTimeFormat(pattern = "yyyy-MM-dd'T'hh:mm:ss")
	private LocalDate date = LocalDateTime.now().toLocalDate();
	@Lob
	private byte[] voucher;
	@OneToMany
	private List<Entry> entries;
}
