package br.com.pastaeriso.web.products.harmonization;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductsHarmonizationRepository extends JpaRepository<ProductsHarmonization, Integer> {

}
