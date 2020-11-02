package br.com.pastaeriso.web.recipeBook.unit;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Unit {

	@Id
	@GeneratedValue
	private Integer id;
	@NonNull
	private String name;
	@NonNull
	private Quantity quantity;
	private boolean favorite = false;

}
