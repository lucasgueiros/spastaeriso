package br.com.pastaeriso.api.recipeBook.input.price;

import br.com.pastaeriso.recipeBook.input.price.InputPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface InputPriceRepository extends JpaRepository<InputPrice, Long> {

}
