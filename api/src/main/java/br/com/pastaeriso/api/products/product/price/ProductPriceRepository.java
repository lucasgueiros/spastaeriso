package br.com.pastaeriso.api.products.product.price;

import br.com.pastaeriso.products.product.price.ProductPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface ProductPriceRepository extends JpaRepository<ProductPrice, Long> {

}
