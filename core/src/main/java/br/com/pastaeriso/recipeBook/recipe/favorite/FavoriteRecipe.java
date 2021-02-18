package br.com.pastaeriso.recipeBook.recipe.favorite;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import br.com.pastaeriso.recipeBook.input.Input;
import br.com.pastaeriso.recipeBook.recipe.Recipe;
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
	private Long id;

	@OneToOne
	@NonNull
	// @Unique
	private Input output;
	@NonNull
	@ManyToOne
	private Recipe recipe;

	private String comment;

}
