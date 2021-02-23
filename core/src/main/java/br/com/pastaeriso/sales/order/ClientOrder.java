/* 
 * The MIT License
 *
 * Copyright 2021 Lucas Dantas Gueiros.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
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
