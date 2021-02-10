package br.com.pastaeriso.accounting.transaction.modality;

import br.com.pastaeriso.accounting.account.Account;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

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
 * Indica a modalidade em que foi feita a transação: dinheiro, cartão de crédito à vista, cartão de débito, cartão de crédito à prazo etc.
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
	@OneToOne
        private Account favorite;
}
