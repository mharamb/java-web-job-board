package hr.algebra.job_board.repository;

import hr.algebra.job_board.model.role.Role;
import hr.algebra.job_board.model.role.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(RoleName name);
}
