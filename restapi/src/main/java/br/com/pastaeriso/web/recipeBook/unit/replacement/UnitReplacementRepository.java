package br.com.pastaeriso.web.recipeBook.unit.replacement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface UnitReplacementRepository extends JpaRepository<UnitReplacement, Integer> {

}
