package com.kami.study.finalProject.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@ControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(ApiRequestException.class)
    public ResponseEntity<String> handleApiRequestException(ApiRequestException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(CaptchaException.class)
    public ResponseEntity<CaptchaException> handleCaptchaException(CaptchaException e) {
        return ResponseEntity.badRequest().body(new CaptchaException(e.getCaptchaError()));
    }

    @ExceptionHandler(EmailException.class)
    public ResponseEntity<EmailException> handleEmailException(EmailException e) {
        return ResponseEntity.badRequest().body(new EmailException(e.getEmailError()));
    }

    @ExceptionHandler(InputFieldException.class)
    public ResponseEntity<Map<String, String>> handleInputFieldException(InputFieldException e) {
        InputFieldException exception = new InputFieldException(e.getBindingResult());
        return ResponseEntity.badRequest().body(exception.getErrorsMap());
    }

    @ExceptionHandler(PasswordConfirmationException.class)
    public ResponseEntity<PasswordConfirmationException> handlePasswordConfirmationException(PasswordConfirmationException e) {
        return ResponseEntity.badRequest().body(new PasswordConfirmationException(e.getPassword2Error()));
    }

    @ExceptionHandler(PasswordException.class)
    public ResponseEntity<PasswordException> handlePasswordException(PasswordException e) {
        return ResponseEntity.badRequest().body(new PasswordException(e.getPasswordError()));
    }
}
