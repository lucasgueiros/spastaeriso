/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.api.sales.order;

import br.com.pastaeriso.products.product.Product;
import br.com.pastaeriso.sales.order.OrderItem;
import br.com.pastaeriso.sales.order.OrderItemEvent;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.data.rest.core.config.Projection;

/**
 *
 * @author lucas
 */
@Projection(name = "withId", types = { OrderItem.class })
public interface OrderItemWithId {
    
    public Long getId();
    
    public List<OrderItemEvent> getEvents();

    public String getComments();
    public Product getProduct();
    public BigDecimal getQuantity();
    public List<OrderItem> getSubItems();
    public BigDecimal getSubtotal();
}
