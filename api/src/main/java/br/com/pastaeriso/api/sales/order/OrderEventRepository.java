package br.com.pastaeriso.api.sales.order;

import br.com.pastaeriso.sales.order.OrderEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author lucas
 */
@Repository
@CrossOrigin
public interface OrderEventRepository extends JpaRepository<OrderEvent, Long>{
    
}
