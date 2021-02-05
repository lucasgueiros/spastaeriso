package br.com.pastaeriso.api.people.address.type;

import br.com.pastaeriso.people.address.type.AddressType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface AdressTypeRepository extends JpaRepository<AddressType, Long>{

}
