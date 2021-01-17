package br.com.pastaeriso.api.purchases.purchase;

import java.io.IOException;
import java.io.StringReader;
import java.nio.charset.StandardCharsets;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.pastaeriso.api.integrations.nfe.TNfeProc;

@RestController
@CrossOrigin
public class PurchaseController {

	@PostMapping("/purchases/fromNFe")
	public Purchase postFromNFe (@RequestParam ("nfe") MultipartFile nfeXml) throws IOException, JAXBException {
		JAXBContext jaxbContext = JAXBContext.newInstance(TNfeProc.class);
		Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
		TNfeProc tnfe = (TNfeProc) unmarshaller.unmarshal(nfeXml.getInputStream());
		System.out.println(tnfe);
		return null;
	}

}
