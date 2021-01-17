package br.com.pastaeriso.api.recipeBook.recipe.favorite;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import br.com.pastaeriso.api.recipeBook.input.Input;
import br.com.pastaeriso.api.recipeBook.recipe.Recipe;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
public class FavoriteRecipe {

	@Id
	@GeneratedValue
	private Integer id;

	@OneToOne
	@NonNull
	// @Unique
	private Input input;
	@NonNull
	@ManyToOne
	private Recipe recipe;

	private String comment;

}
