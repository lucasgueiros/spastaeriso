package br.com.pastaeriso.api.accounting.card;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface CardRepository extends JpaRepository<Card, Long> {
	
	public List<Card> findByCnpj(String cnpj);
	
	@Query("FROM Card WHERE CNPJ = ?1 AND FAVORITE = TRUE")
	public Optional<Card> findFavoriteByCnpj(String cnpj);

}
