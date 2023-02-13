package com.kami.study.finalProject.service.persistence.impl;


import com.kami.study.finalProject.exception.ApiRequestException;
import com.kami.study.finalProject.model.Users;
import com.kami.study.finalProject.repository.UserRepository;
import com.kami.study.finalProject.service.persistence.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository repository;

    @Override
    public List<Users> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Users> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public List<Users> delete(Users object) {
        repository.delete(object);
        return repository.findAll();
    }

    @Override
    public Users create(Users object) {
        return repository.save(object);
    }

    @Override
    public Users update(Users object) {
        return repository.save(object);
    }

    @Override
    public Users findUserByEmail(String mail) {
        return repository.findByMail(mail)
                .orElseThrow(() -> new ApiRequestException("Email not found.", HttpStatus.NOT_FOUND));
    }
}
