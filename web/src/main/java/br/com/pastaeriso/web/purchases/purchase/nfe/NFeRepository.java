package br.com.pastaeriso.web.purchases.purchase.nfe;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NFeRepository extends JpaRepository<NFe, Integer> {

}
