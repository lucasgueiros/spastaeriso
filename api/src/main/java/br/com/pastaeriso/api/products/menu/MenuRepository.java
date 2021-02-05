package br.com.pastaeriso.api.products.menu;

import br.com.pastaeriso.products.menu.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface MenuRepository extends JpaRepository<Menu, Long> {

}
