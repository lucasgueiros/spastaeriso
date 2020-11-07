package br.com.pastaeriso.web.finances.account;

import java.time.LocalDate;

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
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
public class Account {

	@Id
	@GeneratedValue
	private Integer id;
	@NonNull
	private String name;
	private LocalDate created = LocalDate.now();
	private String comment;

}
