/* 
 * The MIT License
 *
 * Copyright 2021 Lucas Dantas Gueiros.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
package br.com.pastaeriso.people.functionary.workDay;

import br.com.pastaeriso.accounting.transaction.GenericTransaction;
import br.com.pastaeriso.people.functionary.contract.FunctionaryContract;
import br.com.pastaeriso.people.functionary.Functionary;
import java.time.Duration;
import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

/**
 *
 * @author lucas
 */
@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@SuperBuilder
public class FunctionaryWorkDay {
    
    @Id
    @GeneratedValue
    private Long id;
    
    private Duration duration;
    
    @ManyToOne
    private Functionary functionary;
    @ManyToOne
    private FunctionaryContract workContract;
    
    private String comment;
    
}
