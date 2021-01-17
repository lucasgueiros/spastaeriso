package br.com.pastaeriso.generics.address.neighborhoods;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface NeighborhoodRepository extends JpaRepository<Neighborhood, Long>{

}
