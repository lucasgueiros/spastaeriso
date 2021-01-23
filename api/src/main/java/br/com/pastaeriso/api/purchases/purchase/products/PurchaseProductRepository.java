package br.com.pastaeriso.api.purchases.purchase.products;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface PurchaseProductRepository extends JpaRepository<PurchaseProduct, Long>{

	public List<PurchaseProduct> findByProductName(String productName);
	public List<PurchaseProduct> findByProductNameIgnoreCase(String productName);
	
}
