package br.com.pastaeriso.api.people.contact;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface ContactRepository extends JpaRepository<Contact, Long> {

}
