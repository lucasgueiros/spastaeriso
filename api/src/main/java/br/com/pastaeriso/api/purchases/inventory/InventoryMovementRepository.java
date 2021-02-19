package br.com.pastaeriso.api.purchases.inventory;

import br.com.pastaeriso.purchases.inventory.InventoryMovement;
import br.com.pastaeriso.recipeBook.input.Input;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface InventoryMovementRepository extends JpaRepository<InventoryMovement, Long> {
    public List<InventoryMovement> findAllByOrderByDateAsc ();
    public List<InventoryMovement> findByInputAndDateGreaterThanEqualOrderByDate (Input input, LocalDate date);
    public Optional<InventoryMovement> findLastByInputAndDateLessThanOrderByDateAsc (Input input, LocalDate date);
    
}
