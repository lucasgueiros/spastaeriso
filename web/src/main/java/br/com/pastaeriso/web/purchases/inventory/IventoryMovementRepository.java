package br.com.pastaeriso.web.purchases.inventory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IventoryMovementRepository extends JpaRepository<IventoryMovement, Integer> {

}
