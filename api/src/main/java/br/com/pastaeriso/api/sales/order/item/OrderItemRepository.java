package br.com.pastaeriso.api.sales.order.item;

import br.com.pastaeriso.sales.order.item.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
