package com.kami.study.finalProject.service.persistence.impl;

import com.kami.study.finalProject.exception.ApiRequestException;
import com.kami.study.finalProject.exception.EmailException;
import com.kami.study.finalProject.exception.PasswordConfirmationException;
import com.kami.study.finalProject.exception.PasswordException;
import com.kami.study.finalProject.model.enums.Role;
import com.kami.study.finalProject.model.User;
import com.kami.study.finalProject.repository.UserRepository;
import com.kami.study.finalProject.security.JwtProvider;
import com.kami.study.finalProject.service.persistence.AuthenticationService;
import com.kami.study.finalProject.service.email.MailSender;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.thymeleaf.util.StringUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;
    private final MailSender mailSender;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;


    @Value("${hostname}")
    private String hostname;

    @Override
    public Map<String, String> login(String mail, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(mail, password));
            User user = userRepository.findByMail(mail)
                    .orElseThrow(() -> new ApiRequestException("Email not found.", HttpStatus.NOT_FOUND));
            String role = user.getRole().name();
            String token = jwtProvider.createToken(mail, role);
            Map<String, String> response = new HashMap<>();
            response.put("mail", mail);
            response.put("token", token);
            response.put("role", role);
            return response;
        } catch (AuthenticationException e) {
            throw new ApiRequestException("Incorrect password or email.", HttpStatus.FORBIDDEN);
        }
    }

    @Override
    public String registerUser(User user, String password2) {
        if (user.getPassword() != null && !user.getPassword().equals(password2)) {
            throw new PasswordException("Password doesn't match.");
        }
        User userFromDB = userRepository.findByMail(user.getMail()).orElse(null);

        if (userFromDB != null) {
            throw new EmailException("Email already used.");
        }

        user.setActive(false);
        user.setRole(Role.USER);
        user.setActivationCode(UUID.randomUUID().toString());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        String subject = "Activation code";
        String template = "registration-template";
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("firstname", user.getFirstname());
        attributes.put("registrationUrl", "http://" + hostname + "/activate/" + user.getActivationCode());
        mailSender.sendMessageHtml(user.getMail(), subject, template, attributes);
        return "User successfully registered.";
    }

    @Override
    public String activateUser(String code) {
        User user = userRepository.findByActivationCode(code)
                .orElseThrow(() -> new ApiRequestException("Activation code not found", HttpStatus.NOT_FOUND));
        user.setActivationCode(null);
        user.setActive(true);
        userRepository.save(user);
        return "User successfully activated.";
    }

    @Override
    public User findByPasswordResetCode(String code) {
        return userRepository.findByPasswordResetCode(code)
                .orElseThrow(() -> new ApiRequestException("Invalid password reset code", HttpStatus.BAD_REQUEST));
    }

    @Override
    public String sendPasswordResetCode(String mail) {
        User user = userRepository.findByMail(mail)
                .orElseThrow(() -> new ApiRequestException("Email not found.", HttpStatus.NOT_FOUND));
        user.setPasswordResetCode(UUID.randomUUID().toString());
        userRepository.save(user);

        String subject = "Password reset";
        String template = "password-reset-template";
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("firstName", user.getFirstname());
        attributes.put("resetUrl", "http://" + hostname + "/reset/" + user.getPasswordResetCode());
        mailSender.sendMessageHtml(user.getMail(), subject, template, attributes);
        return "Reset password code was sent to your email.";
    }

    @Override
    public String passwordReset(String mail, String password, String password2) {
        if (StringUtils.isEmpty(password2)) {
            throw new PasswordConfirmationException("Password confirmation can't be empty.");
        }
        if (password != null && !password.equals(password2)) {
            throw new PasswordException("Password doesn't match.");
        }
        User user = userRepository.findByMail(mail)
                .orElseThrow(() -> new ApiRequestException("Email not found.", HttpStatus.NOT_FOUND));
        user.setPassword(passwordEncoder.encode(password));
        user.setPasswordResetCode(null);
        userRepository.save(user);
        return "Password successfully changed.";
    }
}
