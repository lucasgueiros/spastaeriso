/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.api.people.functionary.function;

import br.com.pastaeriso.people.functionary.function.FunctionaryFunction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 *
 * @author lucas
 */
@Repository
@CrossOrigin
public interface FunctionaryFunctionRepository extends JpaRepository<FunctionaryFunction, Long>{
    
}
