package hr.algebra.job_board.repository;

import hr.algebra.job_board.model.jobStatus.JobStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobStatusRepository extends JpaRepository<JobStatus, Long> {
}
