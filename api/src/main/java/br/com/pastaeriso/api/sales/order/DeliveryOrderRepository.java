package br.com.pastaeriso.api.sales.order;

import br.com.pastaeriso.sales.order.DeliveryOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface DeliveryOrderRepository extends JpaRepository<DeliveryOrder, Long> {

}