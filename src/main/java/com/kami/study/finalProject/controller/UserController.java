package com.kami.study.finalProject.controller;

import com.kami.study.finalProject.model.User;
import com.kami.study.finalProject.service.persistence.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    final UserService service;

    @GetMapping
    public ResponseEntity<User> getById(@RequestBody Long id) {
        Optional<User> optionalUser = service.findById(id);
        return optionalUser
                .map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.BAD_REQUEST));
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return new ResponseEntity<>("Hello!", HttpStatus.OK);
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<User>> getAll() {
        List<User> list = service.findAll();
        return list != null && !list.isEmpty()
                ? new ResponseEntity<>(list, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
    }
}
