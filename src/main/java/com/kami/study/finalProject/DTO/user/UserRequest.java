package com.kami.study.finalProject.DTO.user;

import com.kami.study.finalProject.DTO.passport.PassportResponse;
import com.kami.study.finalProject.model.enums.UserRole;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class UserRequest {
    @NotBlank(message = "First name cannot be empty.")
    private final String firstname;
    @NotBlank(message = "Last name cannot be empty.")
    private final String lastname;
    private final Short age;
    private final PassportResponse passport;
    private final UserRole role;
    private final String phoneNumber;
    private final String password;
}
