package com.kami.study.finalProject.service;

import com.kami.study.finalProject.model.user.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> findAll();
    Optional<User> findById(Long id);
}
