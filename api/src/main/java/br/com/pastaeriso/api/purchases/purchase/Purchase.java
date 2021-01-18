package br.com.pastaeriso.api.purchases.purchase;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import br.com.pastaeriso.api.finances.transaction.Transaction;
import br.com.pastaeriso.api.purchases.provider.Provider;
import br.com.pastaeriso.api.purchases.purchase.items.PurchaseItem;
import br.com.pastaeriso.api.purchases.purchase.nfe.NFeXml;
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
public class Purchase {

	@Id
	@GeneratedValue
	private Integer id;
	@NonNull
	@ManyToOne
	private Provider provider;
	@OneToOne
	private NFeXml nfe;
	private BigDecimal additionalValue;
	@OneToOne
	private Transaction transaction;
	@OneToMany
	private List<PurchaseItem> items;

}
