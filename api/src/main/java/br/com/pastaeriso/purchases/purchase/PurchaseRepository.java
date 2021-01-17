package br.com.pastaeriso.purchases.purchase;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface PurchaseRepository extends JpaRepository<Purchase, Integer> {

}
