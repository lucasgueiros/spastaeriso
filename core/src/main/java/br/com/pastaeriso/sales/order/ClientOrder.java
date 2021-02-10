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
import br.com.pastaeriso.sales.order.item.OrderItem;
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
	@NonNull
	private Person client;
	@NonNull
	private LocalDateTime made = LocalDateTime.now();
	
	// Pedido
	@ManyToMany
	private List<OrderItem> items;
	
	// Forecast payment
	@ManyToOne
	private TransactionModality forecastPaymentModality;
	private BigDecimal forecastChangeTo;
	
	// Delivery?
	private boolean isDelivery = true;
	private String comments;
	@NonNull
	@Enumerated(EnumType.STRING)
	private ClientOrderStatus status = ClientOrderStatus.INCOMPLETE;
	
	// Real payment
	@NonNull
	@OneToMany
	private List<GenericTransaction> payments;

}
