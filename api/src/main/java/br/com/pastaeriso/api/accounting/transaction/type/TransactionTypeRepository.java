package br.com.pastaeriso.api.accounting.transaction.type;

import br.com.pastaeriso.accounting.transaction.type.TransactionType;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface TransactionTypeRepository extends JpaRepository<TransactionType, Long> {

    public Optional<TransactionType> findByName(String name);
    
}
