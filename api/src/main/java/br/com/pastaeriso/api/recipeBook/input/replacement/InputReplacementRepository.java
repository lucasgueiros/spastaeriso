package br.com.pastaeriso.api.recipeBook.input.replacement;

import br.com.pastaeriso.recipeBook.input.replacement.InputReplacement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface InputReplacementRepository extends JpaRepository<InputReplacement, Long> {

}
