package br.com.pastaeriso.api.accounting.transaction.type;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface TransactionTypeRepository extends JpaRepository<TransactionType, Long> {

}
