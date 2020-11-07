package br.com.pastaeriso.web.recipeBook.recipe;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface RecipeRepository extends JpaRepository<Recipe, Integer> {

}
