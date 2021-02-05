package br.com.pastaeriso.api.recipeBook.recipe.intruction;

import br.com.pastaeriso.recipeBook.recipe.intruction.Instruction;
import org.springframework.data.rest.core.config.Projection;


@Projection(types = Instruction.class)
public interface InstructionDetails {

	public String getText();
	public Integer getIndex();
	
}
