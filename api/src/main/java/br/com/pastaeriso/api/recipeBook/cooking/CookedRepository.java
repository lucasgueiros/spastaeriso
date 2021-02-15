/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.api.recipeBook.cooking;

import br.com.pastaeriso.recipeBook.cooking.Cooked;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 *
 * @author lucas
 */
@Repository
@CrossOrigin
public interface CookedRepository extends JpaRepository<Cooked, Long>{
    
}