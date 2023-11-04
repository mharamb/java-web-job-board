package hr.algebra.job_board.service;

import hr.algebra.job_board.model.jobStatus.JobStatus;
import hr.algebra.job_board.payload.PagedResponse;

public interface JobStatusService {
    PagedResponse<JobStatus> getAllJobStatus(int page, int size);
}
