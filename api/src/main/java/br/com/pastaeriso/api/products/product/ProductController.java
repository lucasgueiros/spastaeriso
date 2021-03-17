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
package br.com.pastaeriso.api.products.product;

import br.com.pastaeriso.api.people.functionary.contract.FunctionaryContractTemplateRepository;
import br.com.pastaeriso.api.purchases.purchase.items.PurchaseItemController;
import br.com.pastaeriso.people.functionary.contract.FunctionaryContractTemplate;
import br.com.pastaeriso.people.functionary.function.FunctionaryFunction;
import br.com.pastaeriso.people.functionary.workingTime.FunctionaryWorkingTime;
import br.com.pastaeriso.products.product.Product;
import br.com.pastaeriso.products.product.items.ProductItem;
import br.com.pastaeriso.recipeBook.input.Input;
import br.com.pastaeriso.recipeBook.input.price.InputPrice;
import br.com.pastaeriso.recipeBook.item.Item;
import br.com.pastaeriso.recipeBook.recipe.Recipe;
import br.com.pastaeriso.recipeBook.recipe.ingredient.Ingredient;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.Optional;
import org.keycloak.adapters.spi.HttpFacade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping
public class ProductController {

    @Autowired
    private ProductRepository repository;
    
    @Autowired
    private PurchaseItemController purchaseItemController;
    
    @Autowired
    private FunctionaryContractTemplateRepository functionaryContractTemplateRepository;
    
    @Transactional
    private BigDecimal calculateCost(Product product) {
        ProductCostReport report = generateProductCostReport(product);
        return report.cost;
    }
    
    @Transactional
    private ProductCostReport generateProductCostReport(Product product) {
        ProductCostReport report = new ProductCostReport();
        report.started = LocalDateTime.now();
        report.product = product.getName();
        
        List<Item> items = new LinkedList<>(product.getItems());
        if(items.isEmpty()) {
            report.explanation = "A lista de itens está vazia";
            report.generatedAt = LocalDateTime.now();
            report.cost = BigDecimal.ZERO;
            return report;
        }
        report.itemsOriginalSize = items.size();
        
        
        // gere a lista completa de itens
        ListIterator<Item> iterator = items.listIterator();
        List<FunctionaryWorkingTime> works = new LinkedList<>();
        List<Item> itemsToAdd = new LinkedList<>();
        
        boolean finished = true;
        do {
            finished = true;
            iterator = items.listIterator();
            while(iterator.hasNext()) {
                Item item = iterator.next();

                Recipe recipe = null;
                if(item instanceof ProductItem) {
                    ProductItem productItem = (ProductItem) item;

                    recipe = productItem.getRecipe();
                } else if (item instanceof Ingredient) {
                    Ingredient ingredient = (Ingredient) item;
                    recipe = ingredient.getRecipe();
                }

                if(recipe != null) {
                    // encontre o output correto da receita
                    Item output = null;
                    for(Item o : recipe.getOutputs()) {
                        if(o.getInput().equals(item.getInput())) {
                            output = o;
                            break;
                        }
                    }
                    if(output == null ) {
                        // ERRO, ESSA RECEITA NÃO SERVE PARA ISSO
                    } else {
                        if(output.getUnit().equals(item.getUnit())) {
                            // SENDO A MESMA UNIDADE, PROPORCIONE DIRETAMENTE
                            recipe = recipe.adjust((item.getQuantity().divide(output.getQuantity(), 10, RoundingMode.CEILING)));
                        } else {
                            // CONVERSÃO DE UNIDADE
                        }

                       // com a receita ajustada, adicione os seus ingredientes e works
                       itemsToAdd.addAll(recipe.getIngredients());
                       works.addAll(recipe.getWorks());
                       finished = false;

                    }
                    iterator.remove();
                }
            }
            items.addAll(itemsToAdd);
            itemsToAdd.clear();
        }while(!finished);
        
        /*
        Faltou considerar o caso de um receita com mais de um output que são
        ambos usados quer numa outra receita quer num produto (ex.: a gordura
        do bacon pode ser usada para fritar os ovos!)
        */
        
        /* Agora some os repetidos Não precisa disso
        iterator = items.listIterator();
        Map<Input,Item> mapItems = new HashMap<>();
        
        while(iterator.hasNext()) {
            Item item = iterator.next();
            
            if(mapItems.containsKey(item.getInput())) {
                Item otherItem = mapItems.get(item.getInput());
                if(otherItem.getUnit().equals(item.getUnit())) {
                    item = item.sum(otherItem);
                    mapItems.put(item.getInput(), item);
                } else {
                    // CONVERSÃO DE UNIDADE
                }
            } else {
                mapItems.put(item.getInput(), item);
            }
        }
        items = new LinkedList<>(mapItems.values());*/
        
        ListIterator<FunctionaryWorkingTime> workIterator;
        /* some também os WorkingTime repetidos NÃO PRECISA DISSO
        workIterator = works.listIterator();
        Map<FunctionaryFunction,FunctionaryWorkingTime> minutes = new HashMap<>();
        while(workIterator.hasNext()) {
            FunctionaryWorkingTime work = workIterator.next();
            if(minutes.containsKey(work.getFunctionaryFunction())) {
                FunctionaryWorkingTime otherWork = minutes.get(work.getFunctionaryFunction());
                work = otherWork.sum(work);
                minutes.put(work.getFunctionaryFunction(), work);
            } else {
                minutes.put(work.getFunctionaryFunction(), work);
            }
        }
        works = new LinkedList<>(minutes.values());*/
        
        // pegue o salário hora e calcule o salário minuto
        Map<FunctionaryFunction,BigDecimal> salarioMinuto = new HashMap<>();
        report.salaryValues = new HashMap<>();
        List<FunctionaryContractTemplate> templates = functionaryContractTemplateRepository.findAll();
        for(FunctionaryContractTemplate template : templates) {
            FunctionaryFunction ff = template.getFunction();
            BigDecimal sm = template.getHourSalary().divide(new BigDecimal(60), 10, RoundingMode.CEILING);
            salarioMinuto.put(ff, sm);
            ProductCostReport.SalaryValue sv = new ProductCostReport.SalaryValue();
            sv.salarioMinuto = sm;
            report.salaryValues.put(ff.getName(), sv);
        }
        
        // agora calcule o custo de trabalho
        BigDecimal total = BigDecimal.ZERO;
        workIterator = works.listIterator();
        while(workIterator.hasNext()) {
            FunctionaryWorkingTime work = workIterator.next();
            if(salarioMinuto.containsKey(work.getFunctionaryFunction())) {
                BigDecimal timeWorked = new BigDecimal(work.getMinutes());
                BigDecimal subtotal = salarioMinuto.get(work.getFunctionaryFunction()).multiply(timeWorked);
                total = total.add(subtotal);
                String function = work.getFunctionaryFunction().getName();
                ProductCostReport.SalaryValue sv = report.salaryValues.get(function);
                sv.tempoTrabalhado = timeWorked;
                sv.subtotal = subtotal;
                sv.totalAfter = total;
                report.salaryValues.put(function, sv);
            }
        }
        
        
        // calcules os preços
        Map<Input,PurchaseItemController.SimplerQuantity> prices = purchaseItemController.updateBalance();
        
        // some os preços
        for(Item item : items) {
            if(prices.containsKey(item.getInput())) {
                PurchaseItemController.SimplerQuantity q = prices.get(item.getInput());
                if(item.getUnit().equals(q.unit)){
                    total = total.add(item.getQuantity().multiply(q.avgPrice));
                } else {
                    // CONVERTER UNIDADE
                }
            } else if(item.getInput().hasPrices()) {
                InputPrice price = item.getInput().getLastPrice();
                if(price == null) {
                    // IGNORE
                }
                if(price.getUnit().equals(item.getUnit())){
                    total = total.add(item.getQuantity().multiply(price.getPricePerUnit()));
                } else {
                    // CONVERTER UNIDADE
                }
            }
        }
        
        report.generatedAt = LocalDateTime.now();
        report.cost = total;
        return report;
    }

    public class TableRow {
        public String product;
        public BigDecimal price;
        public BigDecimal cost;

        public TableRow(String product, BigDecimal price, BigDecimal cost) {
            this.product = product;
            this.price = price;
            this.cost = cost;
        }




    }
    
    @GetMapping("/products/{id}/costReport")
    @Transactional
    public ResponseEntity<ProductCostReport> costReport(@PathVariable("id") Long id) {
        Optional<Product> optional = repository.findById(id);
        if(optional.isPresent()) {
            Product product = optional.get();
            ProductCostReport report = generateProductCostReport(product);
            return ResponseEntity.ok().body(report);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/products/costs")
    @Transactional
    public List<TableRow> calculateCosts() {
            List<TableRow> result = new LinkedList<>();

            for (Product product : repository.findAll()) {
                result.add(new TableRow(product.getName(), product.getPrice(), this.calculateCost(product)));
            }

            return result;
    }

}
