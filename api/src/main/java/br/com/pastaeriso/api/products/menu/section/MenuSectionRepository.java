package br.com.pastaeriso.api.products.menu.section;

import br.com.pastaeriso.products.menu.section.MenuSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface MenuSectionRepository extends JpaRepository<MenuSection, Long> {

}
