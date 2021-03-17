/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.pastaeriso.api.products.product;

import br.com.pastaeriso.products.product.Product;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

/**
 *
 * @author lucas
 */
public class ProductCostReport {
    
    public LocalDateTime started;
    public LocalDateTime generatedAt;
    public String product;
    public BigDecimal cost;
    public String explanation;
    public int itemsOriginalSize;
    public Map<String,SalaryValue> salaryValues;
    
    public static class RecipeUsed {
        public String itemInput;
        public String itemUnit;
        public BigDecimal itemQuantity;
        public String recipeUsed;
    }
    
    public static class SalaryValue {
        public BigDecimal salarioMinuto;
        public BigDecimal tempoTrabalhado;
        public BigDecimal subtotal;
        public BigDecimal totalAfter;
    }
    
}
