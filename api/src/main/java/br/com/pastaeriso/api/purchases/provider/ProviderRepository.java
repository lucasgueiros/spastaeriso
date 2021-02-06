package br.com.pastaeriso.api.purchases.provider;

import br.com.pastaeriso.purchases.provider.Provider;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface ProviderRepository extends JpaRepository<Provider, Long> {

	public Optional<Provider> findByCnpj(String cnpj);
	
}
