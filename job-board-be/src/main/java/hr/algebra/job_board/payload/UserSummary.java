package hr.algebra.job_board.payload;

import hr.algebra.job_board.model.Job;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

@Data
@AllArgsConstructor
public class UserSummary {
	private Long id;
	private String username;
	private String email;
	private String firstName;
	private String lastName;
	private List<Job> appliedJobs;
	private Collection<? extends GrantedAuthority> authorities;
}
