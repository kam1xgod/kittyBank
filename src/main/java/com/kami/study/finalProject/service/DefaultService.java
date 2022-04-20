package com.kami.study.finalProject.service;

import java.util.List;
import java.util.Optional;

public interface DefaultService<T> {
    List<T> findAll();
    Optional<T> findById(Long id);
    void delete(T object);
    void create(T object);
    void update(T object);
}
