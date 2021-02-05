package br.com.pastaeriso.api.recipeBook.recipe.favorite;

import br.com.pastaeriso.recipeBook.recipe.favorite.FavoriteRecipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface FavoriteRecipeRepository extends JpaRepository<FavoriteRecipe, Long> {

}
