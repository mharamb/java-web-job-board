package hr.algebra.job_board.payload.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class JobRequest {
    @NotBlank
    private String name;

    @NotBlank
    private String description;

    @NotNull
    private Long statusId;
}
