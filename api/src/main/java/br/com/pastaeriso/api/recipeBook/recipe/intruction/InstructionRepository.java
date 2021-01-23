package br.com.pastaeriso.api.recipeBook.recipe.intruction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
@RepositoryRestResource(excerptProjection = InstructionDetails.class)
public interface InstructionRepository extends JpaRepository<Instruction, Long> {

}
