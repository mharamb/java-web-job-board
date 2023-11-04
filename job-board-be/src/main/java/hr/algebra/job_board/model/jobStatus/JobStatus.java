package hr.algebra.job_board.model.jobStatus;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import hr.algebra.job_board.model.Job;
import hr.algebra.job_board.model.audit.DateAudit;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "job_status")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class JobStatus extends DateAudit {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "status", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Job> jobs;

    public JobStatus(String name) {
        super();
        this.name = name;
    }

    public List<Job> getJobs() {
        return this.jobs == null ? null : new ArrayList<>(this.jobs);
    }

    public void setJobs(List<Job> jobs) {
        if (jobs == null) {
            this.jobs = null;
        } else {
            this.jobs = Collections.unmodifiableList(jobs);
        }
    }
}
