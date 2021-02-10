package br.com.pastaeriso.purchases.purchase;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import br.com.pastaeriso.accounting.transaction.GenericTransaction;
import br.com.pastaeriso.purchases.provider.Provider;
import br.com.pastaeriso.purchases.purchase.items.PurchaseItem;
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
public class Purchase extends GenericTransaction{

	@NonNull
	@ManyToOne
	private Provider provider;
	private BigDecimal additionalValue = new BigDecimal(0);
	@OneToMany
        @Singular
	private List<PurchaseItem> items;

}
