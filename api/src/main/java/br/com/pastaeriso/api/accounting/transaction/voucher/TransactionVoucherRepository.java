/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.api.accounting.transaction.voucher;

import br.com.pastaeriso.accounting.transaction.voucher.TransactionVoucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 *
 * @author lucas
 */
@Repository
@CrossOrigin
public interface TransactionVoucherRepository extends JpaRepository<TransactionVoucher, Long> {
    
}
