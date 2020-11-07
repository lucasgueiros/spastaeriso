package br.com.pastaeriso.web.products.menu;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface MenuRepository extends JpaRepository<Menu, Integer> {

}