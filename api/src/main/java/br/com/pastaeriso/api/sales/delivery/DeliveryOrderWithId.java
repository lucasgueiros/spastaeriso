/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.api.sales.delivery;

import br.com.pastaeriso.people.address.Address;
import br.com.pastaeriso.sales.delivery.DeliveryOrder;
import br.com.pastaeriso.sales.delivery.DeliveryOrderEvent;
import br.com.pastaeriso.sales.order.OrderItem;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.rest.core.config.Projection;

/**
 *
 * @author lucas
 */
@Projection(name = "withId", types = {DeliveryOrder.class})
public interface DeliveryOrderWithId {
    
	public Long getId();
        public List<OrderItem> getItems();
	public Address getDeliveryAddress();
        public BigDecimal getDeliveryPrice();
        public LocalDateTime getCalculatedDeliveryTime();
	public LocalDateTime getForecastedDeliveryTime();
	public LocalDateTime getRequestedDeliveryTime();
        public List<DeliveryOrderEvent> getEvents();
        
}
