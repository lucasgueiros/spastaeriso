package br.com.pastaeriso.web.sales.delivery.deliveryman.contract.template;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContractTemplateRepository extends JpaRepository<ContractTemplate, Integer> {

}
