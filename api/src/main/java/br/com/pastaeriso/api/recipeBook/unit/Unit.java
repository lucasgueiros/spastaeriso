package br.com.pastaeriso.api.recipeBook.unit;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
	private Long id;
	@NonNull
	private String name;
	@NonNull
	@Enumerated(EnumType.STRING)
	private Quantity quantity;
	private boolean favorite = false;

}
