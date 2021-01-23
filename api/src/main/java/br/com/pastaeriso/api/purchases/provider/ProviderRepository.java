package br.com.pastaeriso.api.purchases.provider;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface ProviderRepository extends JpaRepository<Provider, Long> {

	public Provider findByCnpj(String cnpj);
	
}
