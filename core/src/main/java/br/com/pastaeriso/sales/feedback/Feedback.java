package br.com.pastaeriso.sales.feedback;

import br.com.pastaeriso.people.contact.Contact;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import br.com.pastaeriso.sales.order.ClientOrder;
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
	private Long id;
	@NonNull
	private LocalDateTime made;
	@ManyToOne
	private ClientOrder order;
	@NonNull
	private String feedback;
        @ManyToOne
        private Contact contact;
}
