package br.com.pastaeriso.web.recipeBook.input.replacement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InputReplacementRepository extends JpaRepository<InputReplacement, Integer> {

}
