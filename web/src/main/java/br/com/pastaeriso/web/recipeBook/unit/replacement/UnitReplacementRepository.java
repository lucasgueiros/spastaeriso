package br.com.pastaeriso.web.recipeBook.unit.replacement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UnitReplacementRepository extends JpaRepository<UnitReplacement, Integer> {

}
