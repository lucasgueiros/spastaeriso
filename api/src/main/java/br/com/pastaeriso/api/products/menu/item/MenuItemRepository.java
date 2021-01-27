package br.com.pastaeriso.api.products.menu.item;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {

}
