package br.com.pastaeriso.accounting.transaction.type;

import br.com.pastaeriso.accounting.account.Account;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import br.com.pastaeriso.accounting.transaction.modality.TransactionModality;
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
 * Indica o que é essa transacao: compra, venda, pagamento, investimento etc.
 * @author lucas
 *
 */
public class TransactionType {

	@Id
	@GeneratedValue
	private Long id;
	@NonNull
	@Column(unique=true)
	private String name;
	private String description;
        @OneToOne
        private Account favoriteAccount;
	
}
