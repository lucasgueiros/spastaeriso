package br.com.pastaeriso.api.recipeBook.item;

import br.com.pastaeriso.recipeBook.item.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
@RepositoryRestResource
public interface ItemRepository extends JpaRepository<Item, Long> {

}
