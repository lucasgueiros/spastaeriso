package br.com.pastaeriso.purchases.purchase.nfce;

import br.com.pastaeriso.accounting.transaction.voucher.TransactionVoucher;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

/**
 *
 * @author lucas
 */
@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder 
public class Nfce {
    
    @Id
    @GeneratedValue
    private Long id;
    @OneToOne
    private NfceXml xml;
    private String accessCode;
    
}
