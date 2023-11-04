package hr.algebra.job_board.controller;

import hr.algebra.job_board.exception.UnauthorizedException;
import hr.algebra.job_board.model.Job;
import hr.algebra.job_board.payload.ApiResponse;
import hr.algebra.job_board.payload.GetJobResponse;
import hr.algebra.job_board.payload.PagedResponse;
import hr.algebra.job_board.payload.request.JobRequest;
import hr.algebra.job_board.security.CurrentUser;
import hr.algebra.job_board.security.UserPrincipal;
import hr.algebra.job_board.service.JobService;
import hr.algebra.job_board.utils.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/job")
public class JobController {
    @Autowired
    private JobService jobService;

    @GetMapping
    public PagedResponse<Job> getAllJobs(
            @RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size) {
        return jobService.getAllJobs(page, size);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Job> addJob(@Valid @RequestBody JobRequest job) {
        return jobService.addJob(job);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetJobResponse> getJob(@PathVariable(name = "id") Long id) {
        return jobService.getJob(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Job> updateJob(@PathVariable(name = "id") Long id,
                                                   @Valid @RequestBody JobRequest job, @CurrentUser UserPrincipal currentUser) throws UnauthorizedException {
        return jobService.updateJob(id, job, currentUser);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deleteJob(@PathVariable(name = "id") Long id,
                                                      @CurrentUser UserPrincipal currentUser) throws UnauthorizedException {
        return jobService.deleteJob(id, currentUser);
    }

    @PutMapping("/applied/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse> appliedOnJob(@PathVariable(name = "id") Long id, @CurrentUser UserPrincipal currentUser) {
        return jobService.appliedOnJob(id, currentUser);
    }
}
