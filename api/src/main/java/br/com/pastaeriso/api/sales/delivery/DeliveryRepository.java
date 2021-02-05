package br.com.pastaeriso.api.sales.delivery;

import br.com.pastaeriso.sales.delivery.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {

}
