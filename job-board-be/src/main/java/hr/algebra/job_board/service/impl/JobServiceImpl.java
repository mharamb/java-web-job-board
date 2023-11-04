package hr.algebra.job_board.service.impl;

import hr.algebra.job_board.exception.BadRequestException;
import hr.algebra.job_board.exception.ResourceNotFoundException;
import hr.algebra.job_board.exception.UnauthorizedException;
import hr.algebra.job_board.model.Job;
import hr.algebra.job_board.model.jobStatus.JobStatus;
import hr.algebra.job_board.model.User;
import hr.algebra.job_board.model.jobStatus.JobStatusName;
import hr.algebra.job_board.model.role.RoleName;
import hr.algebra.job_board.payload.ApiResponse;
import hr.algebra.job_board.payload.GetJobResponse;
import hr.algebra.job_board.payload.PagedResponse;
import hr.algebra.job_board.payload.request.JobRequest;
import hr.algebra.job_board.repository.JobRepository;
import hr.algebra.job_board.repository.JobStatusRepository;
import hr.algebra.job_board.repository.UserRepository;
import hr.algebra.job_board.security.UserPrincipal;
import hr.algebra.job_board.service.JobService;
import hr.algebra.job_board.utils.AppUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static hr.algebra.job_board.utils.AppConstants.*;

@Service
public class JobServiceImpl implements JobService {

	@Autowired
	private JobRepository jobRepository;

	@Autowired
	private JobStatusRepository jobStatusRepository;

	@Autowired
	private UserRepository userRepository;

	@Override
	public PagedResponse<Job> getAllJobs(int page, int size) {
		AppUtils.validatePageNumberAndSize(page, size);

		Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, CREATED_AT);

		Page<Job> jobs = jobRepository.findAll(pageable);

		List<Job> content = jobs.getNumberOfElements() == 0 ? Collections.emptyList() : jobs.getContent();

		return new PagedResponse<>(content, jobs.getNumber(), jobs.getSize(), jobs.getTotalElements(),
				jobs.getTotalPages(), jobs.isLast());
	}

	@Override
	public ResponseEntity<GetJobResponse> getJob(Long id) {
		Job job = jobRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Job", "id", id));

		List<User> users = userRepository.findAll();
		List<User> appliedUsers = users.stream()
				.filter(user -> user.getAppliedJobs().stream()
						.anyMatch(appliedJob -> Objects.equals(appliedJob.getId(), job.getId())))
				.map(user -> new User(user.getFirstName(), user.getLastName(), user.getEmail()))
				.collect(Collectors.toList());

		job.setAppliedUsers(appliedUsers);

		return new ResponseEntity<>(new GetJobResponse(job.getId(), job.getName(), job.getDescription(), job.getStatus(), appliedUsers), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Job> addJob(JobRequest jobRequest) {
		JobStatus jobStatus = jobStatusRepository.findById(jobRequest.getStatusId())
				.orElseThrow(() -> new ResourceNotFoundException(JOB_STATUS, ID, jobRequest.getStatusId()));
		Job job = new Job();

		job.setName(jobRequest.getName());
		job.setDescription(jobRequest.getDescription());
		job.setStatus(jobStatus);

		Job newPost = jobRepository.save(job);

		return new ResponseEntity<>(newPost, HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<Job> updateJob(Long id, JobRequest newJob, UserPrincipal currentUser) throws UnauthorizedException {
		JobStatus jobStatus = jobStatusRepository.findById(newJob.getStatusId())
				.orElseThrow(() -> new ResourceNotFoundException(JOB_STATUS, ID, newJob.getStatusId()));
		Job job = jobRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(JOB, ID, id));

		if (job.getCreatedAt().equals(currentUser.getId()) || currentUser.getAuthorities()
				.contains(new SimpleGrantedAuthority(RoleName.ROLE_ADMIN.toString()))) {

			job.setName(newJob.getName());
			job.setDescription(newJob.getDescription());
			job.setStatus(jobStatus);

			Job updatedJob = jobRepository.save(job);

			return new ResponseEntity<>(updatedJob, HttpStatus.OK);
		}

		throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
	}

	@Override
	public ResponseEntity<ApiResponse> deleteJob(Long id, UserPrincipal currentUser) throws UnauthorizedException {
		Job job = jobRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(JOB, ID, id));

		if (job.getCreatedAt().equals(currentUser.getId()) || currentUser.getAuthorities()
				.contains(new SimpleGrantedAuthority(RoleName.ROLE_ADMIN.toString()))) {
			jobRepository.deleteById(id);
			return new ResponseEntity<>(new ApiResponse(Boolean.TRUE, "You successfully deleted job"), HttpStatus.OK);
		}
		throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
	}

	@Override
	public ResponseEntity<ApiResponse> appliedOnJob(Long id, UserPrincipal currentUser) throws UnauthorizedException, BadRequestException {
		Job job = jobRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(JOB, ID, id));

		if (Objects.equals(job.getStatus().getName(), JobStatusName.EXPIRED.toString())) {
			throw new BadRequestException("Job is expired. Only on valid job you can applied.");
		}

		User user = userRepository.findById(currentUser.getId()).orElseThrow(() -> new UsernameNotFoundException(String.format("User not found with id: %s", id)));
		List<User> appliedUsers = new ArrayList<>(job.getAppliedUsers());

		if (appliedUsers.stream().anyMatch(appliedUser -> Objects.equals(appliedUser.getId(), user.getId()))) {
			throw new BadRequestException("You already applied for this job.");
		}

		if (job.getCreatedAt().equals(currentUser.getId()) || currentUser.getAuthorities()
				.contains(new SimpleGrantedAuthority(RoleName.ROLE_USER.toString()))) {

			appliedUsers.add(user);
			job.setAppliedUsers(appliedUsers);

			jobRepository.save(job);

			return new ResponseEntity<>(new ApiResponse(Boolean.TRUE, "You successfully deleted job"), HttpStatus.OK);
		}
		throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
	}
}






















