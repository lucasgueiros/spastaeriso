package br.com.pastaeriso.web.sales.order.item.group;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemGroupRepository extends JpaRepository<OrderItemGroup, Integer> {

}
