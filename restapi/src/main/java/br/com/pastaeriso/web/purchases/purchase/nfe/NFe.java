package br.com.pastaeriso.web.purchases.purchase.nfe;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.Nationalized;

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
public class NFe {
	@Id
	@GeneratedValue
	private Integer id;
	@NonNull
	private String accessCode;
	@NonNull
	private String stateCode;
	@Nationalized
	private String xml;
}
