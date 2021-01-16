package br.com.pastaeriso.products.menu;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import br.com.pastaeriso.products.menu.item.MenuItem;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
public class Menu {

	@Id
	@GeneratedValue
	private Integer id;
	@NonNull
	private String title;
	@OneToMany
	@NonNull
	private List<MenuItem> items;
	private String comments;

}
