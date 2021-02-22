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
import br.com.pastaeriso.purchases.purchase.nfce.Nfce;
import java.util.LinkedList;
import javax.persistence.Column;
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
public class Purchase {

    @Id
    @GeneratedValue
    private Long id;
    @OneToOne
    private GenericTransaction transaction;
    @NonNull
    @ManyToOne
    private Provider provider;
    @Column(precision = 25, scale=10)
    @Builder.Default
    private BigDecimal additionalValue = new BigDecimal(0);
    @OneToMany(orphanRemoval = true)
    @Singular
    private List<PurchaseItem> items;
    @OneToOne
    private Nfce nfce;
        
}
