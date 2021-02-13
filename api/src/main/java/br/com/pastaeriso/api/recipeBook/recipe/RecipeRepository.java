package br.com.pastaeriso.api.recipeBook.recipe;

import br.com.pastaeriso.recipeBook.recipe.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
@RepositoryRestResource
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

}
