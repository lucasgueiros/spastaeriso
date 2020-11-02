package br.com.pastaeriso.web.recipeBook.recipe.intruction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface InstructionRepository extends JpaRepository<Intruction, Integer> {

}
