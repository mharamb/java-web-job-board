package hr.algebra.job_board.cron;

import hr.algebra.job_board.model.Job;
import hr.algebra.job_board.repository.JobRepository;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
public class JobCron {
    private final JobRepository jobRepository;

    @Scheduled(cron = "0/20 * * * * ?")
    public void checkDatabaseState() {
        final List<Job> jobs = jobRepository.findAll();

        System.out.println("Periodic task, num of jobs: " + jobs.size());
    }
}
