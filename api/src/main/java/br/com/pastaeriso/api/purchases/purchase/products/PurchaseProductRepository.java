package br.com.pastaeriso.api.purchases.purchase.products;

import br.com.pastaeriso.purchases.purchase.products.PurchaseProduct;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface PurchaseProductRepository extends JpaRepository<PurchaseProduct, Long>{

	public List<PurchaseProduct> findByDeclaredInputAndDeclaredUnitIgnoreCase(String declaredInput, String declaredUnit);
	
}
