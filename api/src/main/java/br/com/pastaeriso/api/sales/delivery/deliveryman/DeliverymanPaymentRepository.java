/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.api.sales.delivery.deliveryman;

import br.com.pastaeriso.sales.delivery.deliveryman.payment.DeliverymanPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 *
 * @author lucas
 */
@Repository
@CrossOrigin
public interface DeliverymanPaymentRepository extends JpaRepository<DeliverymanPayment, Long>{
    
}
