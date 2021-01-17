package br.com.pastaeriso.api.generics.contact;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
public class Contact {

	@Id
	@GeneratedValue
	private Integer id;
	@NonNull
	private String name = "default";
	@NonNull
	private String contact;
	@NonNull
	@Enumerated(EnumType.STRING)
	private ContactChannel channel;

}
