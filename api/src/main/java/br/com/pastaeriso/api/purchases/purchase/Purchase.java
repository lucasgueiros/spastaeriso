package br.com.pastaeriso.api.purchases.purchase;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import br.com.pastaeriso.api.finances.transaction.Transaction;
import br.com.pastaeriso.api.purchases.provider.Provider;
import br.com.pastaeriso.api.purchases.purchase.nfe.NFeXml;
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
public class Purchase {

	@Id
	@GeneratedValue
	private Integer id;
	@NonNull
	@ManyToOne
	private Provider provider;
	@NonNull
	private LocalDateTime made;
	@OneToOne
	private NFeXml nfe;
	private BigDecimal valorextra;
	@OneToOne
	private Transaction transaction;
	private BigDecimal totaltributos;
	private BigDecimal totalfrete;
	private BigDecimal totalseguro;
	private BigDecimal totaldesconto;
	@NonNull
	private BigDecimal total;

}
