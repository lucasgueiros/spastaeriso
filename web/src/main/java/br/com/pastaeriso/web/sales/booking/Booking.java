package br.com.pastaeriso.web.sales.booking;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

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
public class Booking {

	@Id
	@GeneratedValue
	private Integer id;
	@OneToOne
	@NonNull
	private ClientOrder order;
	@NonNull
	private LocalDateTime forecast = LocalDateTime.now().plusHours(1L);
	@NonNull
	@Enumerated(EnumType.STRING)
	private BookingStatus status = BookingStatus.CALCULATED;
	private String comment;
}
