package com.kami.study.finalProject.service.persistence;

import java.util.List;
import java.util.Optional;

public interface DefaultService<T> {
    List<T> findAll();
    Optional<T> findById(Long id);
    List<T> delete(T object);
    T create(T object);
    T update(T object);
}
