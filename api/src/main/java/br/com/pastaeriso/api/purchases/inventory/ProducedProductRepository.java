/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.api.purchases.inventory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import br.com.pastaeriso.purchases.inventory.PruducedProduct;
/**
 *
 * @author lucas
 */
@Repository
@CrossOrigin
public interface ProducedProductRepository extends JpaRepository<PruducedProduct, Long>{
    
}
