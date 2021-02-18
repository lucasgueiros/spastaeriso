package br.com.pastaeriso.api.products.product;

import br.com.pastaeriso.products.product.Product;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping
public class ProductController {

	@Autowired
	private ProductRepository repository;

        public class TableRow {
            public String product;
            public BigDecimal price;
            public BigDecimal cost;

        public TableRow(String product, BigDecimal price, BigDecimal cost) {
            this.product = product;
            this.price = price;
            this.cost = cost;
        }

        
            
            
        }
        
	@GetMapping("/products/costs")
	public List<TableRow> calculateCosts() {
		List<TableRow> result = new LinkedList<>();

		for (Product product : repository.findAll()) {
                    result.add(new TableRow(product.getName(), product.getPrice(), BigDecimal.TEN));
		}

		return result;
	}

}
