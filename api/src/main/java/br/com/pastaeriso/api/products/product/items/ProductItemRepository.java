package br.com.pastaeriso.api.products.product.items;

import br.com.pastaeriso.products.product.items.ProductItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface ProductItemRepository extends JpaRepository<ProductItem, Long> {

}
