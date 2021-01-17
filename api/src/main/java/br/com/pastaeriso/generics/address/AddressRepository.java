package br.com.pastaeriso.generics.address;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface AddressRepository extends JpaRepository<Address, Integer> {

}
