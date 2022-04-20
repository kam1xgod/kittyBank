package com.kami.study.finalProject.service.impl;


import com.kami.study.finalProject.model.user.User;
import com.kami.study.finalProject.repository.UserRepository;
import com.kami.study.finalProject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository repository;

    @Autowired
    public UserServiceImpl(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<User> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public void delete(User object) {

    }

    @Override
    public void create(User object) {

    }

    @Override
    public void update(User object) {

    }
}
