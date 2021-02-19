package br.com.pastaeriso.products.product;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import br.com.pastaeriso.products.category.ProductCategory;
import br.com.pastaeriso.products.product.items.ProductItem;
import br.com.pastaeriso.products.product.price.ProductPrice;
import javax.persistence.FetchType;
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
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Product {

	@Id
	@GeneratedValue
	private Long id;
	@NonNull
	private String name;
	@NonNull
        @Builder.Default
	private LocalDate created = LocalDate.now();
	private String description;
	private String comments;
	@OneToMany(fetch = FetchType.EAGER)
	private List<ProductPrice> prices;
	@OneToMany
	private List<ProductItem> items;
        @OneToMany
        private List<ProductRecipe> recipes;
	@Lob
	private byte[] image;
	@ManyToMany
        @Singular
	private List<ProductCategory> categories;

        public BigDecimal getPrice() {
            return this.getPrice(LocalDate.now());
        }
        public BigDecimal getPrice(LocalDate date) {
            if(this.getPrices().isEmpty()) {
                return BigDecimal.ONE;
            }
            ProductPrice max = prices.get(0);
            for(ProductPrice price : this.prices) {
                if(price.getDate().isAfter(max.getDate())
                        && (price.getDate().isBefore(date) || price.getDate().equals(date) )) {
                    max = price;
                }
            }
            return max.getPrice();
        }

    

}
