package br.com.pastaeriso.api.sales.delivery.deliveryman.contract.template;

import br.com.pastaeriso.sales.delivery.deliveryman.contract.template.ContractTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface ContractTemplateRepository extends JpaRepository<ContractTemplate, Long> {

}
