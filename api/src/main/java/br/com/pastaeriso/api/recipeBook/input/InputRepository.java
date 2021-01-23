package br.com.pastaeriso.api.recipeBook.input;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface InputRepository extends JpaRepository<Input, Long> {

	public Input findByName(String name);
	
}
