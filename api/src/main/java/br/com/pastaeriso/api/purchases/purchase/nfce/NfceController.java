/* 
 * The MIT License
 *
 * Copyright 2021 Lucas Dantas Gueiros.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
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
import br.com.pastaeriso.purchases.purchase.nfce.NfceXml;
import java.util.Optional;
import javax.websocket.server.PathParam;
import org.springframework.http.MediaType;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    @Autowired
    private NfceXmlRepository nfceXmlRepository;

    @PostMapping("/nfces/xml")
    public ResponseEntity<Nfce> postNfceFromXml(@RequestParam("nfce") final MultipartFile nfce) throws JAXBException, IOException {
        return new ResponseEntity<>(save(nfce), HttpStatus.CREATED);
    }
    
    public Nfce save(MultipartFile nfeXml) throws JAXBException, IOException {
        JAXBContext jaxbContext = JAXBContext.newInstance(NfeProc.class);
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        NfeProc root = (NfeProc) unmarshaller.unmarshal(nfeXml.getInputStream());
        NfeProc.Proc proc = (NfeProc.Proc) ((javax.xml.bind.JAXBElement) root.getContent().get(4)).getValue();

        String accessCode = proc.getNfeProc().getProtNFe().getInfProt().getChNFe();
        byte[] xml = nfeXml.getBytes();
        NfceXml nfceXml = NfceXml.builder().xml(xml).build();
        nfceXml = nfceXmlRepository.save(nfceXml);
        Nfce nfe = Nfce.builder().accessCode(accessCode).xml(nfceXml).build();
        return repository.save(nfe);
    }
    
    @GetMapping(value = "/nfces/{id}/xml/download",
            produces = MediaType.TEXT_XML_VALUE,
            headers = {"Content-Disposition=attachment","filename=\"picture.png\""})
    public byte[] download(@PathVariable("id") Long id) {
        Optional<Nfce> nfce = repository.findById(id);
        if(nfce.isPresent()) {
            return nfce.get().getXml().getXml();
        } else {
            return new byte[0];
        }
    }

}
