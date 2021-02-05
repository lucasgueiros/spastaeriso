package br.com.pastaeriso.api.sales.booking;

import br.com.pastaeriso.sales.booking.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface BookingRepository extends JpaRepository<Booking, Long> {

}
