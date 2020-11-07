package br.com.pastaeriso.web.recipeBook.input.price;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface InputPriceRepository extends JpaRepository<InputPrice, Integer> {

}
