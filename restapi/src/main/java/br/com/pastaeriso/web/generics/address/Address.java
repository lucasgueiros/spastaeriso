package br.com.pastaeriso.web.generics.address;

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
public class Address {

	@Id
	@GeneratedValue
	private Integer id;
	@NonNull
	private String name = "principal";
	private String localName;
	private String rua;
	private String numero;
	private String bairro;
	private String complemento;
	private String pontoDeReferencia;
	private String comentarios;
	@NonNull
	@Enumerated(EnumType.STRING)
	private AddressType type;

}
