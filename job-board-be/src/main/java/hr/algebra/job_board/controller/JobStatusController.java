package hr.algebra.job_board.controller;

import hr.algebra.job_board.model.jobStatus.JobStatus;
import hr.algebra.job_board.payload.PagedResponse;
import hr.algebra.job_board.service.JobStatusService;
import hr.algebra.job_board.utils.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/job-status")
public class JobStatusController {
    @Autowired
    private JobStatusService jobStatusService;

    @GetMapping
    public PagedResponse<JobStatus> getAllCategories(
            @RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size) {
        return jobStatusService.getAllJobStatus(page, size);
    }
}
