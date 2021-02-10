package br.com.pastaeriso.api.purchases.purchase.nfce;

import br.com.pastaeriso.purchases.purchase.nfce.Nfce;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface NfceRepository extends JpaRepository<Nfce, Long> {

	public Optional<Nfce> findByAccessCode(String accessCode);
	
}
