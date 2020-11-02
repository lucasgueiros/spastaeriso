package br.com.pastaeriso.web.recipeBook.unit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface UnitRepository extends JpaRepository<Unit, Integer> {

}
