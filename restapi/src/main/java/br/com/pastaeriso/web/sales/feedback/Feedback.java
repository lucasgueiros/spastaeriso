package br.com.pastaeriso.web.sales.feedback;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import br.com.pastaeriso.web.sales.order.ClientOrder;
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
public class Feedback {
	@Id
	@GeneratedValue
	private Integer id;
	@NonNull
	private LocalDateTime made;
	@ManyToOne
	private ClientOrder order;
	@NonNull
	private String feedback;
}
