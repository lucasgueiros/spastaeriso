/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.api.purchases.purchase.products;

import br.com.pastaeriso.api.purchases.purchase.items.PurchaseItemRepository;
import br.com.pastaeriso.api.recipeBook.input.InputRepository;
import br.com.pastaeriso.purchases.purchase.items.PurchaseItem;
import br.com.pastaeriso.purchases.purchase.products.PurchaseProduct;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author lucas
 */
@RestController
@CrossOrigin
public class PurchaseProductsController {
    
    @Autowired
    private PurchaseItemRepository purchaseItemRepository;
    
    @Autowired
    private PurchaseProductRepository purchaseProductRepository;
    
    @Autowired
    private InputRepository inputRepository;
    
    @RequestMapping(value = "/purchaseProducts/{id}/apply", method = RequestMethod.GET)
    public ResponseEntity<String> apply(@PathVariable Long id) {
        
        PurchaseProduct purchaseProduct = purchaseProductRepository.findById(id).get();
        if(purchaseProduct == null) {
            return ResponseEntity.notFound().build();
        }
        List<PurchaseItem> items = purchaseItemRepository.findByInventoryMovement_Input(inputRepository.findByName("Desconhecido"));
        for(PurchaseItem item : items) {
            if(purchaseProduct.appliesTo(item)) {
                item = purchaseProduct.apply(item);
                purchaseItemRepository.save(item);
            }
        }
        
        return ResponseEntity.ok().build();
    }
    
}
