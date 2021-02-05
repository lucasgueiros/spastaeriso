package br.com.pastaeriso.api.sales.delivery.deliveryman;

import br.com.pastaeriso.sales.delivery.deliveryman.Deliveryman;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface DeliverymanRepository extends JpaRepository<Deliveryman, Long> {

}
