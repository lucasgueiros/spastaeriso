package br.com.pastaeriso.recipeBook.recipe.ingredient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
@RepositoryRestResource(excerptProjection = IngredientDetails.class)
public interface IngredientRepository extends JpaRepository<Ingredient, Integer> {

}
