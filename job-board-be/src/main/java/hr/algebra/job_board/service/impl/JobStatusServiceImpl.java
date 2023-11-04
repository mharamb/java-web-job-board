package hr.algebra.job_board.service.impl;

import hr.algebra.job_board.model.jobStatus.JobStatus;
import hr.algebra.job_board.payload.PagedResponse;
import hr.algebra.job_board.repository.JobStatusRepository;
import hr.algebra.job_board.service.JobStatusService;
import hr.algebra.job_board.utils.AppUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class JobStatusServiceImpl implements JobStatusService {
    @Autowired
    private JobStatusRepository jobStatusRepository;

    @Override
    public PagedResponse<JobStatus> getAllJobStatus(int page, int size) {
        AppUtils.validatePageNumberAndSize(page, size);

        Pageable pageable = PageRequest.of(page, size);

        Page<JobStatus> statuses = jobStatusRepository.findAll(pageable);

        List<JobStatus> content = statuses.getNumberOfElements() == 0 ? Collections.emptyList() : statuses.getContent();

        return new PagedResponse<>(content, statuses.getNumber(), statuses.getSize(), statuses.getTotalElements(),
                statuses.getTotalPages(), statuses.isLast());
    }
}
