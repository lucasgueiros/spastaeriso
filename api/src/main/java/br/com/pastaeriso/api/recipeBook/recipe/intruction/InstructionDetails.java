package br.com.pastaeriso.api.recipeBook.recipe.intruction;

import org.springframework.data.rest.core.config.Projection;


@Projection(types = Instruction.class)
public interface InstructionDetails {

	public String getText();
	public Integer getIndex();
	
}
