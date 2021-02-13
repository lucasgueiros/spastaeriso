package br.com.pastaeriso.planning.prospect;

import br.com.pastaeriso.products.product.Product;
import br.com.pastaeriso.sales.order.item.OrderItem;
import br.com.pastaeriso.sales.order.product.OrderProduct;
import java.time.Period;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SalesProspect {

    @Id
    @GeneratedValue
    private Long id;
    
    private Period period;
    
    @ManyToMany
    private List<OrderProduct> prospected;
}
