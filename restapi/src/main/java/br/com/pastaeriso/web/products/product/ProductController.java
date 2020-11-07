package br.com.pastaeriso.web.products.product;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api1/services/products")
@CrossOrigin
public class ProductController {

	@Autowired
	private ProductRepository repository;

	@GetMapping("/costs")
	public Map<Product, BigDecimal> calculateCosts() {
		Map<Product, BigDecimal> result = new HashMap<Product, BigDecimal>();

		for (Product product : repository.findAll()) {
			result.put(product, new BigDecimal(0));// product.getCost(inputs, units, handcrafted, prices));
		}

		return result;
	}

}
