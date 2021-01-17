package br.com.pastaeriso.api.products.menu.section;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;

import br.com.pastaeriso.api.products.menu.item.MenuItem;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class MenuSection extends MenuItem {

	@NonNull
	private String title;
	@NonNull
	@ManyToMany
	private List<MenuItem> items;

}
