package br.com.pastaeriso.api.accounting.transaction.modality;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface TransactionModalityRepository extends JpaRepository<TransactionModality, Long> {

	public Optional<TransactionModality> findByName(String modalityName);

}
