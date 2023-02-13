package com.kami.study.finalProject.service.persistence;

import com.kami.study.finalProject.model.Users;

import java.util.Map;

public interface AuthenticationService {
    Map<String, String> login(String mail, String password);
    String registerUser(Users user, String password2);
//    User registerOauth2User(String provider, OAuth2UserInfo oAuth2UserInfo);
//    User updateOauth2User(User user, String provider, OAuth2UserInfo oAuth2UserInfo);
    String activateUser(String code);
    Users findByPasswordResetCode(String code);
    String sendPasswordResetCode(String mail);
    String passwordReset(String mail, String password, String password2);
}
