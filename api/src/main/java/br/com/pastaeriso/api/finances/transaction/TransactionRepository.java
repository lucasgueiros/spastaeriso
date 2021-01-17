package br.com.pastaeriso.api.finances.transaction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

}
