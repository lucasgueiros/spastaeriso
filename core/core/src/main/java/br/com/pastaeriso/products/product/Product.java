/* 
 * The MIT License
 *
 * Copyright 2021 Lucas Dantas Gueiros.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
package br.com.pastaeriso.products.product;

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

import br.com.pastaeriso.recipeBook.replacements.NonReplaceableException;
import br.com.pastaeriso.products.category.ProductCategory;
import br.com.pastaeriso.products.product.items.ProductItem;
import br.com.pastaeriso.products.product.price.ProductPrice;
import br.com.pastaeriso.recipeBook.input.Input;
import br.com.pastaeriso.recipeBook.input.price.InputPrice;
import br.com.pastaeriso.recipeBook.recipe.Recipe;
import br.com.pastaeriso.recipeBook.unit.replacement.UnitReplacementMap;
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
	private Long id;
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
