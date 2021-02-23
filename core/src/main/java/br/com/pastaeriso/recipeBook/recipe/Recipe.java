package br.com.pastaeriso.recipeBook.recipe;

import br.com.pastaeriso.people.functionary.workingTime.FunctionaryWorkingTime;
import java.time.LocalDate;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import br.com.pastaeriso.recipeBook.item.Item;
import br.com.pastaeriso.recipeBook.recipe.ingredient.Ingredient;
import br.com.pastaeriso.recipeBook.recipe.intruction.Instruction;
import java.time.format.DateTimeFormatter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.Singular;
import lombok.ToString;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class Recipe {

    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String title;
    
    @NonNull
    @Builder.Default
    private LocalDate version = LocalDate.now();
    @Builder.Default
    private String modality = "Padrão";
    
    private String comment;

    private Integer preparationTime;
    private Integer totalTime;

    @OneToMany
    @Singular
    private List<Instruction> instructions;

    @OneToMany
    @Singular
    private List<FunctionaryWorkingTime> works;
    @OneToMany
    @Singular
    private List<Ingredient> ingredients;
    @OneToMany
    @Singular
    private List<Item> outputs;

    public String getUniqueTitle() {
        return title + " " + modality + " (" + version.format(DateTimeFormatter.ISO_DATE) + ")";
    }
    
    @Transient
    public boolean adjusted = false;

}
