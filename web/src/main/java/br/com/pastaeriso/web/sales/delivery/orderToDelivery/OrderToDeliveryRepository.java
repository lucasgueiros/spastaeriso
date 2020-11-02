package br.com.pastaeriso.web.sales.delivery.orderToDelivery;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderToDeliveryRepository extends JpaRepository<OrderToDelivery, Integer> {

}
