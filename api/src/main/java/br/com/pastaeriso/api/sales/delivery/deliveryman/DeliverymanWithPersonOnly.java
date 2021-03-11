/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.api.sales.delivery.deliveryman;

import br.com.pastaeriso.people.person.Person;
import br.com.pastaeriso.sales.delivery.deliveryman.Deliveryman;
import org.springframework.data.rest.core.config.Projection;

/**
 *
 * @author lucas
 */
@Projection(name = "withPersonOnly", types = {Deliveryman.class})
public interface DeliverymanWithPersonOnly {
    
    public Person getPerson();
    
}
