package com.kami.study.finalProject.DTO.user;

import com.kami.study.finalProject.DTO.passport.PassportResponse;
import com.kami.study.finalProject.model.enums.Role;
import lombok.Data;

import java.io.Serializable;

@Data
public class UserResponse implements Serializable {
    private final Long id;
    private final String firstname;
    private final String lastname;
    private final Short age;
    private final PassportResponse passport;
    private final Role role;
    private final String mail;
    private final String password;
}
