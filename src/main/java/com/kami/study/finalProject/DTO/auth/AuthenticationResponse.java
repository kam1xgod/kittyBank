package com.kami.study.finalProject.DTO.auth;

import lombok.Data;

@Data
public class AuthenticationResponse {
    private String mail;
    private String token;
    private String role;
}
