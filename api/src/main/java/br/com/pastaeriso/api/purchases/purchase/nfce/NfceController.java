package br.com.pastaeriso.api.purchases.purchase.nfce;

import java.io.IOException;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import br.com.pastaeriso.api.integrations.nfe.NfeProc;
import br.com.pastaeriso.purchases.purchase.nfce.Nfce;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@RestController
@CrossOrigin
@RequestMapping(produces = "application/hal+json")
public class NfceController {

    @Autowired
    private NfceRepository repository;

    @PostMapping("/nFeXmls/fromXml")
    public ResponseEntity<Nfce> postNfeFromXml(@RequestParam("nfce") final MultipartFile nfce) throws JAXBException, IOException {
        return new ResponseEntity<>(save(nfce), HttpStatus.CREATED);
    }
    
    public Nfce save(MultipartFile nfeXml) throws JAXBException, IOException {
        JAXBContext jaxbContext = JAXBContext.newInstance(NfeProc.class);
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        NfeProc root = (NfeProc) unmarshaller.unmarshal(nfeXml.getInputStream());
        NfeProc.Proc proc = (NfeProc.Proc) ((javax.xml.bind.JAXBElement) root.getContent().get(4)).getValue();

        String accessCode = proc.getNfeProc().getProtNFe().getInfProt().getChNFe();
        byte[] xml = nfeXml.getBytes();
        Nfce nfe = Nfce.builder().accessCode(accessCode).xml(xml).build();
        return repository.save(nfe);
    }

}
