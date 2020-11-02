package br.com.pastaeriso.web.sales.payment;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import br.com.pastaeriso.web.finances.transaction.Transaction;
import br.com.pastaeriso.web.sales.order.ClientOrder;
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
public class OrderPayment {
	@Id
	@GeneratedValue
	private Integer id;
	@NonNull
	@OneToMany
	private List<Transaction> transaction;
	@NonNull
	@ManyToOne
	private ClientOrder order;

}
