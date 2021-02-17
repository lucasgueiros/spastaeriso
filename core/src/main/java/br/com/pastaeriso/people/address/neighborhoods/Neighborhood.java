package br.com.pastaeriso.people.address.neighborhoods;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

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
public class Neighborhood {

	@Id
	@GeneratedValue
	private Long id;
	@NonNull
	private String name;
	@NonNull
	private String city = "Garanhuns";
	@NonNull
	private String state = "PE";
	
}
