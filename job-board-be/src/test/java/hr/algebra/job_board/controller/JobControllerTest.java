package hr.algebra.job_board.controller;

import hr.algebra.job_board.BaseTest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class JobControllerTest extends BaseTest {
    @Test
    public void createJobWithOutToken() throws Exception {
        final Map<String, Object> body = new HashMap<>();
        body.put("name", "test name");
        body.put("description", "test description");
        body.put("statusId", 1);

        mockMvc.perform(
                        post("/api/job")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(body))
                )
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void updateJobWithOutToken() throws Exception {
        final Map<String, Object> body = new HashMap<>();
        body.put("name", "test name");
        body.put("description", "test description");
        body.put("statusId", 1);

        mockMvc.perform(
                        put("/api/job")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(body))
                )
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void deleteJobWithOutToken() throws Exception {
        mockMvc.perform(
                        put("/api/job/4")
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void getAll() throws Exception {
        mockMvc.perform(
                        get("/api/job")
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));
    }

    @Test
    public void getByIdCorrectIdValue() throws Exception {
        mockMvc.perform(
                        get("/api/job/4")
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk());
    }

    @Test
    public void getByIdWithWrongIdForValue() throws Exception {
        mockMvc.perform(
                        get("/api/job/marko")
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isBadRequest());
    }
}
