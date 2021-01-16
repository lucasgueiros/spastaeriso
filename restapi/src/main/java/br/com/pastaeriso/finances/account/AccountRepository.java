package br.com.pastaeriso.finances.account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface AccountRepository extends JpaRepository<Account, Integer> {

}
