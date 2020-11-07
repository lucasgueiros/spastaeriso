package br.com.pastaeriso.web.sales.delivery.deliveryman;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface DeliverymanRepository extends JpaRepository<Deliveryman, Integer> {

}
