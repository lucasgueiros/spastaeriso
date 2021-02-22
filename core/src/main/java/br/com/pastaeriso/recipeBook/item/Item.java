package br.com.pastaeriso.recipeBook.item;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import br.com.pastaeriso.recipeBook.input.Input;
import br.com.pastaeriso.recipeBook.unit.Unit;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Inheritance
public class Item {

	@Id
	@GeneratedValue
	private Long id;
	@NonNull
        @Column(precision = 25, scale=10)
	private BigDecimal quantity;
	@NonNull
	@ManyToOne
        @JoinColumn(name="input_id")
	private Input input;
	@NonNull
	@ManyToOne
	private Unit unit;
	private String comment;
	@Transient
	@Builder.Default
	private boolean adjusted = false;

        public Item adjust(BigDecimal times) {
            return Item.builder()
                    .input(this.getInput())
                    .unit(this.getUnit())
                    .comment(this.getComment())
                    .quantity(this.getQuantity().multiply(times))
                    .adjusted(true)
                    .build();
        }
       
    public Item sum(Item item2) {
        return Item.builder()
                .input(this.getInput())
                .quantity(this.getQuantity().add(item2.getQuantity()))
                .unit(this.getUnit())
                .build();
    }

}
