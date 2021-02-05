package br.com.pastaeriso.api.accounting.account;

import br.com.pastaeriso.accounting.account.Account;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

@RepositoryRestResource
@CrossOrigin (origins = "http://localhost:3000/")
public interface AccountRepository extends JpaRepository<Account, Long> {

	public Optional<Account> findByNameIgnoreCase(String name);
}
