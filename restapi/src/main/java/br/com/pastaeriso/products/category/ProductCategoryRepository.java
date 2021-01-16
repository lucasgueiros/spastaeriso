package br.com.pastaeriso.products.category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Integer> {

}
