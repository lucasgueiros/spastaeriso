package br.com.pastaeriso.recipeBook.replacements;

import java.math.BigDecimal;

public interface Replacement<T> {

	public T getFrom();

	public T getTo();

	public BigDecimal getProportion();

}
