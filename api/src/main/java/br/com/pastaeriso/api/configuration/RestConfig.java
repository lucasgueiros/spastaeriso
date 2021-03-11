/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.api.configuration;

import br.com.pastaeriso.api.sales.delivery.DeliveryOrderWithId;
import br.com.pastaeriso.api.sales.delivery.deliveryman.DeliverymanWithPersonOnly;
import br.com.pastaeriso.api.sales.order.OrderItemWithId;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

/**
 *
 * @author lucas
 */
@Configuration
public class RestConfig implements RepositoryRestConfigurer {
 
    @Override
    public void configureRepositoryRestConfiguration(
            RepositoryRestConfiguration repositoryRestConfiguration) {
        repositoryRestConfiguration.getProjectionConfiguration()
          .addProjection(OrderItemWithId.class)
          .addProjection(DeliverymanWithPersonOnly.class)
          .addProjection(DeliveryOrderWithId.class);
    }
}
