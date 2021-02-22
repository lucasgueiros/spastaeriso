/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.api.purchases.purchase.items;

import br.com.pastaeriso.api.purchases.inventory.InventoryMovementController;
import br.com.pastaeriso.api.purchases.inventory.InventoryMovementRepository;
import br.com.pastaeriso.purchases.inventory.InventoryMovement;
import br.com.pastaeriso.purchases.purchase.items.PurchaseItem;
import br.com.pastaeriso.recipeBook.input.Input;
import br.com.pastaeriso.recipeBook.unit.Unit;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author lucas
 */
@RestController
@CrossOrigin
public class PurchaseItemController {

    private class ReturnQuantity {

        public BigDecimal avgPrice;
        public String unit;
        public String input;
    }

    private class SimplerQuantity {

        public BigDecimal avgPrice;
        public Unit unit;

    }

    @Autowired
    private PurchaseItemRepository repository;
    @Autowired
    private InventoryMovementController inventoryMovementController;
    @Autowired
    private InventoryMovementRepository inventoryMovementRepository;

    @GetMapping("/purchaseItems/balance")
    public List<ReturnQuantity> balance() {
        Map<Input, SimplerQuantity> qs = updateBalance();
        List<ReturnQuantity> items = new LinkedList<>();
        for (Input i : qs.keySet()) {
            ReturnQuantity rq = new ReturnQuantity();
            rq.input = i.getName();
            rq.unit = qs.get(i).unit.getName();
            rq.avgPrice = qs.get(i).avgPrice;
            items.add(rq);
        }
        items.sort((i1, i2) -> {
            return i1.input.compareTo(i2.input);
        });
        return items;
    }

    public Map<Input, SimplerQuantity> updateBalance() {
        inventoryMovementController.updateBalance();

        List<InventoryMovement> ims = inventoryMovementRepository.findAllByOrderByDateAsc();
        List<PurchaseItem> items = repository.findAllByOrderByInventoryMovement_DateAsc();
        Map<Long, PurchaseItem> purchaseItemOfInventoryMovement = new HashMap<>();
        for (PurchaseItem item : items) {
            purchaseItemOfInventoryMovement.put(item.getInventoryMovement().getId(), item);
        }

        Map<Input, SimplerQuantity> quantities = new HashMap<>();
        Map<Input, InventoryMovement> lastInventoryMovement = new HashMap<>();
        Map<Input, PurchaseItem> lastPurchaseItems = new HashMap<>();

        for (InventoryMovement im : ims) {
            Input input = im.getInput();
            if (purchaseItemOfInventoryMovement.containsKey(im.getId())) {
                PurchaseItem item = purchaseItemOfInventoryMovement.get(im.getId());
                
                SimplerQuantity q;
                if (quantities.containsKey(input)) {
                    q = quantities.get(input);

                    if (q.unit.equals(im.getUnit())) {
                        PurchaseItem purchaseItemAnterior = lastPurchaseItems.get(input);

                        BigDecimal 
                                custoCompra = item.getPricePerUnit(),
                                qtdComra = im.getQuantity(),
                                custoAnterior = purchaseItemAnterior.getAvgPrice(),
                                quantidadeEstoque = lastInventoryMovement.get(input).getCalculatedBalance();
                        BigDecimal 
                                valorTotalComprado = custoCompra.multiply(qtdComra),
                                valorTotalEmEstoque = custoAnterior.multiply(quantidadeEstoque),
                                quantidadeTotal = qtdComra.add(quantidadeEstoque);
                        BigDecimal valorTotal = valorTotalComprado.add(valorTotalEmEstoque);
                        q.avgPrice = valorTotal.divide(quantidadeTotal, 10, RoundingMode.CEILING);
                    } else {
                        // converter unidade
                    }
                } else {
                    q = new SimplerQuantity();
                    q.avgPrice = item.getPricePerUnit();
                    q.unit = im.getUnit();
                }
                quantities.put(input, q);
                lastPurchaseItems.put(input, item);
                item.setAvgPrice(q.avgPrice);
                repository.save(item);
            }
            lastInventoryMovement.put(input, im);
        }
        return quantities;
    }

}
