package br.com.pastaeriso.api.accounting.transaction.modality;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

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
/**
 * Indica a modalidade, tipo, dinheiro mesmo, ou pagamento no cartao, transferencia bancaria etc.
 * @author lucas
 *
 */
public class TransactionModality {

	@Id
	@GeneratedValue
	private Long id;
	@NonNull
	@Column(unique=true)
	private String name;
	private String description;
	
}
