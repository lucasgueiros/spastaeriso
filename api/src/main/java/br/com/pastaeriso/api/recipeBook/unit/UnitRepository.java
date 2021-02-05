package br.com.pastaeriso.api.recipeBook.unit;

import br.com.pastaeriso.recipeBook.unit.Unit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface UnitRepository extends JpaRepository<Unit, Long> {

	public Unit findByName(String name);
	
	public Unit findByNameIgnoreCase(String name);
	
}
