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
package br.com.pastaeriso.products.product.items;

import java.math.BigDecimal;
import java.util.Map;

import javax.persistence.Entity;

import br.com.pastaeriso.recipeBook.replacements.NonReplaceableException;
import br.com.pastaeriso.recipeBook.input.Input;
import br.com.pastaeriso.recipeBook.input.price.InputPrice;
import br.com.pastaeriso.recipeBook.item.Item;
import br.com.pastaeriso.recipeBook.recipe.Recipe;
import br.com.pastaeriso.recipeBook.unit.replacement.UnitReplacementMap;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class ProductItem extends Item {

	public BigDecimal getCost(@NonNull UnitReplacementMap replacements, @NonNull Map<Input, Recipe> handcrafted,
			@NonNull Map<Input, InputPrice> prices) throws NonReplaceableException {

		// se o meu insumo deve ser produzido artesanalmente (ex. queijo)
		if (handcrafted.containsKey(this.getInput())) {
			// use a receita de queijo
			return handcrafted.get(this.getInput()).getCost(this.getQuantity(), this.getUnit(), replacements,
					handcrafted, prices);
		} else if (prices.containsKey(this.getInput())) { // tente ver se tem um preco definido para o meu input
			// depois, coloque as coisas na mesma unidade
			BigDecimal quantity = replacements.toFavorite(this.getQuantity(), this.getUnit());
			// e multiplique o preco por unidade pela quantidade proporcionada
			return prices.get(this.getInput()).getPriceByUnit().multiply(quantity);
		} else {
			// se nao e uma receita e eu nao tenho o preco do insumo...
			throw new NonReplaceableException(
					"Nao tem nenhuma receita para produzir e o insumo nao tem preco: " + super.getInput());
		}
	}

}
