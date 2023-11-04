package hr.algebra.job_board.payload;

import hr.algebra.job_board.model.User;
import hr.algebra.job_board.model.jobStatus.JobStatus;
import lombok.Data;

import java.util.List;

@Data
public class GetJobResponse {
    private Long id;
    private String name;
    private String description;
    private JobStatus status;
    private List<User> appliedUsers;

    public GetJobResponse(Long id, String name, String description, JobStatus status, List<User> appliedUsers) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.appliedUsers = appliedUsers;
    }
}
