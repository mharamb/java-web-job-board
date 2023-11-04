package hr.algebra.job_board.repository;

import hr.algebra.job_board.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {

}