/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.api.sales.delivery;

import br.com.pastaeriso.sales.delivery.DeliveryPriceByNeighborhood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 *
 * @author lucas
 */
@RepositoryRestResource (collectionResourceRel = "deliveryPricesByNeighborhood", path = "deliveryPricesByNeighborhood")
@CrossOrigin
public interface DeliveryPriceByNeighborhoodRepository extends JpaRepository<DeliveryPriceByNeighborhood,Long>{
    
}
