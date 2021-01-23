package br.com.pastaeriso.api.people.contact.channel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface ContactChannelRepository extends JpaRepository<ContactChannel, Long> {

}
