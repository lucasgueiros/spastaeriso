package br.com.pastaeriso.recipeBook.item;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
@RepositoryRestResource(excerptProjection = ItemDetails.class)
public interface ItemRepository extends JpaRepository<Item, Integer> {

}
