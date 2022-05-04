package com.kami.study.finalProject.DTO;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class RegistrationRequest {

//    @NotBlank(message = "Fill captcha.")
//    private String captcha;

    @NotBlank(message = "First name should be filled.")
    private String firstname;

    @NotBlank(message = "Last name should be filled.")
    private String lastname;

    @Size(min = 6, max = 16, message = "The password must be from 6 to 16 characters long.")
    private String password;

    @Size(min = 6, max = 16, message = "The password confirmation must be from 6 to 16 characters long.")
    private String password2;

    @Email(message = "Incorrect email.")
    @NotBlank(message = "Email can't be empty.")
    private String mail;
}
