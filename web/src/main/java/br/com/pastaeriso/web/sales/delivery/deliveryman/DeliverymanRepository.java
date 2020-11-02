package br.com.pastaeriso.web.sales.delivery.deliveryman;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliverymanRepository extends JpaRepository<Deliveryman, Integer> {

}
