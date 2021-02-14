package br.com.pastaeriso.api.sales.delivery.deliveryman.contract;

import br.com.pastaeriso.sales.delivery.deliveryman.contract.DeliverymanContract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface ContractRepository extends JpaRepository<DeliverymanContract, Long> {

}
