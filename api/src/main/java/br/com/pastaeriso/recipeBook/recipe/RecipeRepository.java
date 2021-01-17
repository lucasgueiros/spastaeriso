package br.com.pastaeriso.recipeBook.recipe;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
@RepositoryRestResource(excerptProjection = RecipeDetails.class)
public interface RecipeRepository extends JpaRepository<Recipe, Integer> {

}
