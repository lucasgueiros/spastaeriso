package br.com.pastaeriso.api.products.harmonization;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface ProductsHarmonizationRepository extends JpaRepository<ProductsHarmonization, Integer> {

}
