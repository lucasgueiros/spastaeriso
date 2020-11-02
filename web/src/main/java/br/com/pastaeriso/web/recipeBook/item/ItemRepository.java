package br.com.pastaeriso.web.recipeBook.item;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface ItemRepository extends JpaRepository<Item, Integer> {

}
