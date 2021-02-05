package br.com.pastaeriso.api.recipeBook.item;

import java.math.BigDecimal;

import org.springframework.data.rest.core.config.Projection;

import br.com.pastaeriso.recipeBook.input.Input;
import br.com.pastaeriso.recipeBook.item.Item;
import br.com.pastaeriso.recipeBook.unit.Unit;

@Projection(types = { Item.class })
public interface ItemDetails {
	
	public BigDecimal getQuantity();
	public Input getInput();
	public Unit getUnit();
	public String getComment();
	
}
