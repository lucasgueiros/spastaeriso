package br.com.pastaeriso.api.accounting.transaction;

import br.com.pastaeriso.accounting.transaction.GenericTransaction;
import br.com.pastaeriso.accounting.transaction.voucher.TransactionVoucher;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@Repository
@CrossOrigin
public interface GenericTransactionRepository extends JpaRepository<GenericTransaction, Long> {

}
