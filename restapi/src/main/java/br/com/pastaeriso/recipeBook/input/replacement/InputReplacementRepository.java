package br.com.pastaeriso.recipeBook.input.replacement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface InputReplacementRepository extends JpaRepository<InputReplacement, Integer> {

}
