package com.kami.study.finalProject.mapper;

import com.kami.study.finalProject.DTO.PasswordResetRequest;
import com.kami.study.finalProject.DTO.RegistrationRequest;
import com.kami.study.finalProject.DTO.auth.AuthenticationRequest;
import com.kami.study.finalProject.DTO.auth.AuthenticationResponse;
import com.kami.study.finalProject.DTO.user.UserResponse;
import com.kami.study.finalProject.exception.InputFieldException;
import com.kami.study.finalProject.model.Users;
import com.kami.study.finalProject.service.persistence.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class AuthenticationMapper {
    private final AuthenticationService authenticationService;
    private final CommonMapper commonMapper;

    public AuthenticationResponse login(AuthenticationRequest request) {
        Map<String, String> credentials = authenticationService.login(request.getMail(), request.getPassword());
        AuthenticationResponse response = new AuthenticationResponse();
        response.setMail(credentials.get("mail"));
        response.setToken(credentials.get("token"));
        response.setRole(credentials.get("role"));
        return response;
    }

    public UserResponse findByPasswordResetCode(String code) {
        return commonMapper.convert(authenticationService.findByPasswordResetCode(code), UserResponse.class);
    }

    public String registerUser(RegistrationRequest registrationRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        Users user = commonMapper.convert(registrationRequest, Users.class);
        return authenticationService.registerUser(user, registrationRequest.getPassword2());
    }

    public String activateUser(String code) {
        return authenticationService.activateUser(code);
    }

    public String sendPasswordResetCode(String email) {
        return authenticationService.sendPasswordResetCode(email);
    }

    public String passwordReset(String email, PasswordResetRequest passwordReset) {
        return authenticationService.passwordReset(email, passwordReset.getPassword(), passwordReset.getPassword2());
    }
}
