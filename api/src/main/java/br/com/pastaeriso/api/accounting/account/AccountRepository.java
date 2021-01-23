package br.com.pastaeriso.api.accounting.account;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface AccountRepository extends JpaRepository<Account, Long> {

	@Query("FROM Account WHERE 	type = ?1 AND favorite = TRUE")
	public Optional<Account> findFavoriteByType(AccountType type);
	public Optional<Account> findByNameIgnoreCase(String name);
}
