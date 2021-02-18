package br.com.pastaeriso.sales.order;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import br.com.pastaeriso.accounting.transaction.GenericTransaction;
import br.com.pastaeriso.accounting.transaction.modality.TransactionModality;
import br.com.pastaeriso.accounting.transaction.voucher.TransactionVoucher;
import br.com.pastaeriso.people.person.Person;
import br.com.pastaeriso.purchases.inventory.PruducedProduct;
import br.com.pastaeriso.sales.order.item.OrderItem;
import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.OneToOne;
import lombok.AllArgsConstructor;
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
public class ClientOrder {

	@Id
	@GeneratedValue
	private Long id;
	@ManyToOne
	private Person client;
        
        // Times or Status
        @NonNull
	private LocalDateTime started = LocalDateTime.now();
        @Column(nullable = true)
        private LocalDateTime completed = null;
        @Column(nullable = true)
        private LocalDateTime approved = null;
        @Column(nullable = true)
        private LocalDateTime startedPreparing = null;
        @Column(nullable = true)
        private LocalDateTime cancelled = null;
        
        @ManyToMany
        private List<PruducedProduct> producedProducts;
	
	// Pedido
	@OneToMany
	private List<OrderItem> items;
	
	// Forecast payment
	@ManyToOne
	private TransactionModality forecastPaymentModality;
	private BigDecimal forecastChangeTo;
	
        @OneToMany(mappedBy = "order")
	private List<DeliveryOrder> deliveries;
        
	private String comments;
	
	// Real payment
	@NonNull
	@OneToMany
	private List<GenericTransaction> payments;

}
