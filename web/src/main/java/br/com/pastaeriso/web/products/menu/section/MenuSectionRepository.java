package br.com.pastaeriso.web.products.menu.section;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuSectionRepository extends JpaRepository<MenuSection, Integer> {

}
