package br.com.pastaeriso.sales.delivery;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface DeliveryRepository extends JpaRepository<Delivery, Integer> {

}
