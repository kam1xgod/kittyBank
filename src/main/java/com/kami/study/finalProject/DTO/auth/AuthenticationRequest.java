package com.kami.study.finalProject.DTO.auth;

import lombok.Data;

@Data
public class AuthenticationRequest {
    private String mail;
    private String password;
}
