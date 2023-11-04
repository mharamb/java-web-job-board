package hr.algebra.job_board.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import hr.algebra.job_board.model.audit.DateAudit;
import hr.algebra.job_board.model.jobStatus.JobStatus;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@Table(name = "jobs")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Job extends DateAudit {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "name")
	private String name;

	@Column(name = "description")
	private String description;

	@ManyToOne
	@JoinColumn(name = "job_status_id")
	private JobStatus status;

	@JsonIgnore
	@ManyToMany
	@JoinTable(name = "job_applied", joinColumns = @JoinColumn(name = "job_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
	private List<User> appliedUsers;

	public Job(String name, String description) {
		super();
		this.name = name;
		this.description = description;
	}

	public List<User> getAppliedUsers() {
		return appliedUsers == null ? null : new ArrayList<>(appliedUsers);
	}

	public void setAppliedUsers(List<User> appliedUsers) {
        this.appliedUsers = appliedUsers;
	}

	@Override
	public String toString() {
		return "Job{" +
				"id=" + id +
				", name='" + name + '\'' +
				", description='" + description + '\'' +
				", status=" + status +
				", appliedUsers=" + appliedUsers +
				'}';
	}
}
