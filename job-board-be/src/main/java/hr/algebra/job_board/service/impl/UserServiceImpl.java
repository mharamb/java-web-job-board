package hr.algebra.job_board.service.impl;

import hr.algebra.job_board.model.Job;
import hr.algebra.job_board.payload.UserSummary;
import hr.algebra.job_board.security.UserPrincipal;
import hr.algebra.job_board.service.UserService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
	@Override
	public UserSummary getCurrentUser(UserPrincipal currentUser) {
		List<Job> jobs = new ArrayList<>();

		for (Job job: currentUser.getAppliedJobs()) {
			Job newJob = new Job();

			newJob.setId(job.getId());
			newJob.setName(job.getName());
			newJob.setDescription(job.getDescription());
			newJob.setStatus(job.getStatus());

			jobs.add(newJob);
		}

		return new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getEmail(), currentUser.getFirstName(),
				currentUser.getLastName(), jobs, currentUser.getAuthorities());
	}
}
