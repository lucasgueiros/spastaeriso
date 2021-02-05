package br.com.pastaeriso.api.people.address;

import br.com.pastaeriso.people.address.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface AddressRepository extends JpaRepository<Address, Long> {

}
