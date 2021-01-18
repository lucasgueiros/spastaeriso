package br.com.pastaeriso.api.purchases.purchase.nfe;

import java.io.IOException;
import java.util.Optional;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import br.com.pastaeriso.api.integrations.nfe.NfeProc;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping(produces = "application/hal+json")
public class NfeXmlController {

	@Autowired
	private NFeXmlRepository repository;
	@PostMapping("/nFeXmls/fromXml")
	public ResponseEntity<NFeXml> postNfeFromXml(@RequestParam ("nfeXml") final MultipartFile nfeXml) throws JAXBException, IOException {
		// processando o xml
		JAXBContext jaxbContext = JAXBContext.newInstance(NfeProc.class);
		Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
		NfeProc root = (NfeProc) unmarshaller.unmarshal(nfeXml.getInputStream());
		NfeProc.Proc proc = (NfeProc.Proc) ( (javax.xml.bind.JAXBElement) root.getContent().get(4)).getValue();
		
		
		String accessCode = proc.getNfeProc().getProtNFe().getInfProt().getChNFe();
		byte [] xml = nfeXml.getBytes(); 
		NFeXml nfe = NFeXml.builder().accessCode(accessCode).xml(xml).build();
		
		return new ResponseEntity<NFeXml>(repository.save(nfe), HttpStatus.CREATED);
	}
	
	@GetMapping("/nFeXmls/getXml")
	public byte[] getXml(@RequestParam("accessCode") String accessCode) {
		Optional<NFeXml> nfe = repository.findByAccessCode(accessCode);
		if(nfe.isEmpty()) return new byte[0];
		return nfe.get().getXml();
	}
}
