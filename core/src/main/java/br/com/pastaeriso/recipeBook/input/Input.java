package br.com.pastaeriso.recipeBook.input;

import br.com.pastaeriso.recipeBook.input.price.InputPrice;
import br.com.pastaeriso.recipeBook.unit.Unit;
import java.math.BigDecimal;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
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
        @ManyToOne
        private Unit favorite;
        @OneToMany
        private List<InputUnitConverter> converters;
        @OneToMany
        private List<InputPrice> prices;

    public boolean hasPrices() {
        return ! prices.isEmpty();
    }

    public InputPrice getLastPrice() {
        prices.sort((p1,p2) -> {
           return p1.getDate().compareTo(p2.getDate()); 
        });
        if(prices.isEmpty()) return null;
        return prices.get(prices.size()-1);
    }


	
}
