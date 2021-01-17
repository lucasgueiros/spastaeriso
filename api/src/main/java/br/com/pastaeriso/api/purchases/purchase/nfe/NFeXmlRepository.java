package br.com.pastaeriso.api.purchases.purchase.nfe;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface NFeXmlRepository extends JpaRepository<NFeXml, Integer> {

}
