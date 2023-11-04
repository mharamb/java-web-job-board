package hr.algebra.job_board.service;

import hr.algebra.job_board.exception.UnauthorizedException;
import hr.algebra.job_board.model.Job;
import hr.algebra.job_board.payload.ApiResponse;
import hr.algebra.job_board.payload.GetJobResponse;
import hr.algebra.job_board.payload.PagedResponse;
import hr.algebra.job_board.payload.request.JobRequest;
import hr.algebra.job_board.security.UserPrincipal;
import org.springframework.http.ResponseEntity;

public interface JobService {

	PagedResponse<Job> getAllJobs(int page, int size);

	ResponseEntity<GetJobResponse> getJob(Long id);

	ResponseEntity<Job> addJob(JobRequest jobRequest);

	ResponseEntity<Job> updateJob(Long id, JobRequest newJob, UserPrincipal currentUser)
			throws UnauthorizedException;

	ResponseEntity<ApiResponse> deleteJob(Long id, UserPrincipal currentUser) throws UnauthorizedException;

	ResponseEntity<ApiResponse> appliedOnJob(Long id, UserPrincipal currentUser)
			throws UnauthorizedException;
}
