package br.com.pastaeriso.api.products.harmonization;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import br.com.pastaeriso.api.products.product.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
public class ProductsHarmonization {

	@Id
	@GeneratedValue
	private Long id;
	@NonNull
	@ManyToOne
	private Product a;
	@NonNull
	@ManyToOne
	private Product b;
	private String comment;

	@Override
	public int hashCode() {
		return Objects.hash(a, b, comment, id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ProductsHarmonization other = (ProductsHarmonization) obj;
		return ((Objects.equals(a, other.a) && Objects.equals(b, other.b))
				|| (Objects.equals(a, other.b) && Objects.equals(b, other.a))) && Objects.equals(comment, other.comment)
				&& Objects.equals(id, other.id);
	}

}
