package br.com.pastaeriso.api.accounting.entry;

import br.com.pastaeriso.accounting.transaction.Entry;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface EntryRepository extends JpaRepository<Entry, Long>{

}
