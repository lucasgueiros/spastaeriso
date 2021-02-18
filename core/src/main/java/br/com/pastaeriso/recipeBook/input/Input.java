package br.com.pastaeriso.recipeBook.input;

import br.com.pastaeriso.recipeBook.input.price.InputPrice;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

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
public class Input {

	@Id
	@GeneratedValue
	private Long id;
	@NonNull
	@Column(unique = true)
	private String name;
	private String comment;
        @OneToMany
        private List<InputPrice> prices;
	
}
