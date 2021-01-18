package br.com.pastaeriso.api.purchases.purchase.nfe;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface NFeXmlRepository extends JpaRepository<NFeXml, Integer> {

	public Optional<NFeXml> findByAccessCode(String accessCode);
	
}
