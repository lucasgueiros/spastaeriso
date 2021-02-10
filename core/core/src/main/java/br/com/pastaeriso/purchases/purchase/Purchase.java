package br.com.pastaeriso.purchases.purchase;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import br.com.pastaeriso.accounting.transaction.Transaction;
import br.com.pastaeriso.purchases.provider.Provider;
import br.com.pastaeriso.purchases.purchase.items.PurchaseItem;
import br.com.pastaeriso.purchases.purchase.nfe.Nfce;
import javax.persistence.CascadeType;
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

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class Purchase {

	@Id
	@GeneratedValue
	private Long id;
	@NonNull
	@ManyToOne(cascade = CascadeType.PERSIST)
	private Provider provider;
	@OneToOne(cascade = CascadeType.ALL)
	private NFeXml nfe;
	private BigDecimal additionalValue = new BigDecimal(0);
	@OneToOne (cascade = CascadeType.ALL)
	private Transaction transaction;
	@OneToMany (cascade = CascadeType.ALL)
        @Singular
	private List<PurchaseItem> items;

}
