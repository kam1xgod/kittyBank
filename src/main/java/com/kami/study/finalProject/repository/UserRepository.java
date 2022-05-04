package com.kami.study.finalProject.repository;

import com.kami.study.finalProject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByMail(String mail);
    Optional<User> findByActivationCode(String code);
    Optional<User> findByPasswordResetCode(String code);
    Optional<User> findByPassportSeriesNumber(String seriesNumber);
}
