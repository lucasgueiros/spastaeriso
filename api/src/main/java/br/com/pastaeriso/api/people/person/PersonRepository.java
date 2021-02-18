package br.com.pastaeriso.api.people.person;

import br.com.pastaeriso.people.person.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "people", path = "people")
@CrossOrigin
public interface PersonRepository extends JpaRepository<Person, Long> {

}
