package br.com.pastaeriso.api.accounting.transaction;

import br.com.pastaeriso.accounting.transaction.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

}
