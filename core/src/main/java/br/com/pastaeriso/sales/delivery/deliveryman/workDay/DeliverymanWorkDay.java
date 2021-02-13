/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.sales.delivery.deliveryman.workDay;

import br.com.pastaeriso.people.functionary.contract.WorkContract;
import br.com.pastaeriso.people.functionary.Functionary;
import br.com.pastaeriso.sales.delivery.Delivery;
import br.com.pastaeriso.sales.delivery.deliveryman.Deliveryman;
import br.com.pastaeriso.sales.delivery.deliveryman.contract.DeliverymanContract;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 *
 * @author lucas
 */
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class DeliverymanWorkDay {
    
    @Id
    @GeneratedValue
    private Long id;
    
    private LocalDateTime start;
    private LocalDateTime stop;
    @OneToMany
    private List<Delivery> deliveries;
    
    @ManyToOne
    private Deliveryman deliveryman;
    @ManyToOne
    private DeliverymanContract contract;
    
    private String comment;
    
}
