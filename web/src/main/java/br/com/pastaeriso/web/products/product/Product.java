package br.com.pastaeriso.web.products.product;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import br.com.pastaeriso.web.generics.replacements.NonReplaceableException;
import br.com.pastaeriso.web.products.category.ProductCategory;
import br.com.pastaeriso.web.products.product.items.ProductItem;
import br.com.pastaeriso.web.products.product.price.ProductPrice;
import br.com.pastaeriso.web.recipeBook.input.Input;
import br.com.pastaeriso.web.recipeBook.input.price.InputPrice;
import br.com.pastaeriso.web.recipeBook.recipe.Recipe;
import br.com.pastaeriso.web.recipeBook.unit.replacement.UnitReplacementMap;
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
public class Product {

	@Id
	@GeneratedValue
	private Integer id;
	@NonNull
	private String name;
	@NonNull
	private LocalDate created = LocalDate.now();
	private String description;
	private String comments;
	@OneToMany
	private List<ProductPrice> precos;
	@OneToMany
	private List<ProductItem> items;
	@Lob
	private byte[] image;
	@ManyToMany
	private List<ProductCategory> categories;

	public BigDecimal getCost(UnitReplacementMap replacements, Map<Input, Recipe> handcrafted,
			Map<Input, InputPrice> prices) throws NonReplaceableException {
		BigDecimal cost = new BigDecimal(0);
		for (ProductItem item : items) {
			cost = cost.add(item.getCost(replacements, handcrafted, prices));
		}
		return cost;
	}

}
