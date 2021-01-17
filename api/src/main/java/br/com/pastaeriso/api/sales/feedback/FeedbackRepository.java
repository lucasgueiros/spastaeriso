package br.com.pastaeriso.api.sales.feedback;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {

}
