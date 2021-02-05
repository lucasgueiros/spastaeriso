package br.com.pastaeriso.api.purchases.purchase.items;

import br.com.pastaeriso.purchases.purchase.items.PurchaseItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface PurchaseItemRepository extends JpaRepository<PurchaseItem, Long> {

}
