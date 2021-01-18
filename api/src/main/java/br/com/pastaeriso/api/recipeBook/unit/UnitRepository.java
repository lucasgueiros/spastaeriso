package br.com.pastaeriso.api.recipeBook.unit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface UnitRepository extends JpaRepository<Unit, Integer> {

	public Unit findByName(String name);
	
	public Unit findByNameIgnoreCase(String name);
	
}
