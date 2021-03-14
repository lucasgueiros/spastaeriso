package br.com.pastaeriso.api.accounting.transaction;


import br.com.pastaeriso.accounting.transaction.GenericTransaction;
import br.com.pastaeriso.accounting.transaction.voucher.TransactionVoucher;
import br.com.pastaeriso.api.accounting.transaction.TransactionVoucherRepository;
import br.com.pastaeriso.api.integrations.nfe.NfeProc;
import br.com.pastaeriso.purchases.purchase.nfce.Nfce;
import br.com.pastaeriso.purchases.purchase.nfce.NfceXml;
import java.io.IOException;
import java.net.URI;
import java.util.Optional;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.hateoas.server.EntityLinks;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author lucas
 */
@RestController
@CrossOrigin
@RequestMapping(produces = "application/hal+json")
public class TransactionVoucherController {
    
    @Autowired
    private GenericTransactionRepository genericTransactionRepository;
    
    @Autowired
    private TransactionVoucherRepository repository;
    
    @Autowired
    private EntityLinks entityLinks;
    
    @PostMapping("/transactionVouchers/upload")
    public ResponseEntity<String> post(@RequestParam("voucher") final MultipartFile voucher) throws JAXBException, IOException {
        byte [] ba = voucher.getBytes();
        String filename = voucher.getOriginalFilename();
        int length = filename.length();
        
        String extension = null;
        if(filename.substring(length-7).equalsIgnoreCase(".tar.gz")) {
            extension = ".tar.gz";
        } else {
            extension = filename.substring(filename.lastIndexOf("."));
        }
        String contentType = voucher.getContentType();
        TransactionVoucher tv = TransactionVoucher.builder().voucher(ba).contentType(contentType).fileExtension(extension).build();
        tv = repository.save(tv);
        URI uri = entityLinks.linkForItemResource(TransactionVoucher.class, tv.getId()).toUri();
        return ResponseEntity
                .created(uri)
                .body(uri.toString());
    }
    
    @GetMapping(value = "/genericTransactions/{id}/voucher/download",
            produces = MediaType.ALL_VALUE,
            headers = {"Content-Disposition=attachment","filename=\"voucher\""})
    public byte[] downloadByTransaction(@PathVariable("id") Long id) {
        Optional<TransactionVoucher> voucher = repository.findById(id);
        if(voucher.isPresent()) {
            return voucher.get().getVoucher();
        } else {
            return new byte[0];
        }
    }
    
    @GetMapping("/genericTransactions/{id}/voucher/download")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable("id") Long id, HttpServletRequest request) {
        Optional<GenericTransaction> gt = genericTransactionRepository.findById(id);
        byte[] ba = null;
        TransactionVoucher voucher = null;
        if(gt.isPresent()) {
            voucher = gt.get().getVoucher();
            if(voucher != null) {
                ba = voucher.getVoucher();
            }
        }
        

        // Try to determine file's content type
        String contentType = voucher.getContentType();

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"comprovante"+voucher.getFileExtension()+"\"")
                .body(new ByteArrayResource(ba));
    }
    
}
