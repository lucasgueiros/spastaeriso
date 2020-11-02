package br.com.pastaeriso.web.generics.person;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface PersonRepository extends JpaRepository<Person, Integer> {

}
