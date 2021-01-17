package br.com.pastaeriso.sales.payment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface OrderPaymentRepository extends JpaRepository<OrderPayment, Integer> {

}
