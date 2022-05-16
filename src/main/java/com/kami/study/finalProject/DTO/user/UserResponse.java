package com.kami.study.finalProject.DTO.user;

import com.kami.study.finalProject.DTO.passport.PassportResponse;
import com.kami.study.finalProject.model.enums.Role;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
public class UserResponse implements Serializable {
    private Long id;
    private String mail;
    private String firstname;
    private String lastname;
    private String activationCode;
    private String passwordResetCode;
    private boolean active;
    private Role role;
}
