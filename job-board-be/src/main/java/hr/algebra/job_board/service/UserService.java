package hr.algebra.job_board.service;

import hr.algebra.job_board.payload.UserSummary;
import hr.algebra.job_board.security.UserPrincipal;

public interface UserService {

	UserSummary getCurrentUser(UserPrincipal currentUser);

}