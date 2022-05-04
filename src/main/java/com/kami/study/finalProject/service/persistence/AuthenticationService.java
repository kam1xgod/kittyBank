package com.kami.study.finalProject.service.persistence;

import com.kami.study.finalProject.model.User;

import java.util.Map;

public interface AuthenticationService {
    Map<String, String> login(String mail, String password);
    String registerUser(User user, String password2);
//    User registerOauth2User(String provider, OAuth2UserInfo oAuth2UserInfo);
//    User updateOauth2User(User user, String provider, OAuth2UserInfo oAuth2UserInfo);
    String activateUser(String code);
    User findByPasswordResetCode(String code);
    String sendPasswordResetCode(String mail);
    String passwordReset(String mail, String password, String password2);
}
