/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.api.recipeBook.input;

import br.com.pastaeriso.recipeBook.input.InputUnitConverter;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author lucas
 */
public interface InputUnitConverterRepository extends JpaRepository<InputUnitConverter, Long> {
    
}
