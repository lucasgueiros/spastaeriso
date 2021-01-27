package br.com.pastaeriso.api.products.menu.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface MenuProductRepository extends JpaRepository<MenuProduct, Long> {

}
