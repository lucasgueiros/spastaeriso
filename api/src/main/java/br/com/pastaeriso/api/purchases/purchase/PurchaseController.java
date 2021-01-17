package br.com.pastaeriso.api.purchases.purchase;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
public class PurchaseController {
	
	@PostMapping("/purchases/fromNFe")
	public Purchase postFromNFe (@RequestParam ("file") MultipartFile file) {
		System.out.println("ok");
		
		return null;
	}

}
