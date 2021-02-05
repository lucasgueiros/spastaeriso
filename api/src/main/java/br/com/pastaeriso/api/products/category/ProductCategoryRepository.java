package br.com.pastaeriso.api.products.category;

import br.com.pastaeriso.products.category.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {

}
