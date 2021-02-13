package br.com.pastaeriso.sales.delivery.deliveryman.payment;

import br.com.pastaeriso.accounting.transaction.GenericTransaction;
import br.com.pastaeriso.sales.delivery.deliveryman.Deliveryman;
import br.com.pastaeriso.sales.delivery.deliveryman.workDay.DeliverymanWorkDay;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@NoArgsConstructor
@SuperBuilder
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class DeliverymanPayment extends GenericTransaction {

    @ManyToOne
    private Deliveryman deliveryman;
    @OneToMany
    private List<DeliverymanWorkDay> workDays;
    
}
