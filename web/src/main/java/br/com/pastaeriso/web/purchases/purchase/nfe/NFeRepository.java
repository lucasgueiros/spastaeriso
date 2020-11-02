package br.com.pastaeriso.web.purchases.purchase.nfe;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface NFeRepository extends JpaRepository<NFe, Integer> {

}
