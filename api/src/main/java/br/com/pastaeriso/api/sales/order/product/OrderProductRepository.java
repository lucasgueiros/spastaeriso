package br.com.pastaeriso.api.sales.order.product;

import br.com.pastaeriso.sales.order.product.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface OrderProductRepository extends JpaRepository<OrderProduct, Long>{

}
