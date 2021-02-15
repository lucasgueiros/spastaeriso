package br.com.pastaeriso.sales.delivery.deliveryman.payment;

import br.com.pastaeriso.accounting.transaction.GenericTransaction;
import br.com.pastaeriso.sales.delivery.deliveryman.Deliveryman;
import br.com.pastaeriso.sales.delivery.deliveryman.workDay.DeliverymanWorkDay;
import java.time.Period;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
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
public class DeliverymanPayment {

    @Id
    @GeneratedValue
    private Long id;
    @OneToOne
    private GenericTransaction transaction;
    @ManyToOne
    private Deliveryman deliveryman;
    @OneToMany
    private List<DeliverymanWorkDay> workDays;
    
}
