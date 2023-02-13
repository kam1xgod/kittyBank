package com.kami.study.finalProject.repository;

import com.kami.study.finalProject.model.Constants;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConstantsRepository extends JpaRepository<Constants, Long> {
    Optional<Constants> findByName(String name);

    Optional<Constants> findById(Long id);
}
