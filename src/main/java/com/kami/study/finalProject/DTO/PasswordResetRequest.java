package com.kami.study.finalProject.DTO;

import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class PasswordResetRequest {
    private String mail;

    @Size(min = 6, max = 16, message = "The password must be from 6 to 16 characters long.")
    private String password;


    @Size(min = 6, max = 16, message = "The password confirmation must be from 6 to 16 characters long.")
    private String password2;
}
