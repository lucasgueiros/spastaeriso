package br.com.pastaeriso.web.purchases.inventory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface IventoryMovementRepository extends JpaRepository<IventoryMovement, Integer> {

}
