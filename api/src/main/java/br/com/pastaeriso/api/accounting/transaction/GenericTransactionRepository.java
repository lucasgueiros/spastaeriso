package br.com.pastaeriso.api.accounting.transaction;

import br.com.pastaeriso.accounting.transaction.GenericTransaction;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface GenericTransactionRepository extends JpaRepository<GenericTransaction, Long> {

    public List<GenericTransaction> findAllByOrderByDateAsc ();
    
}
