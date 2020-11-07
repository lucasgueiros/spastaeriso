package br.com.pastaeriso.web.sales.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface ClientOrderRepository extends JpaRepository<ClientOrder, Integer> {

}
