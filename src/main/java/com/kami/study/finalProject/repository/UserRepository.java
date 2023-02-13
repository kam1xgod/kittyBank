package com.kami.study.finalProject.repository;

import com.kami.study.finalProject.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByMail(String mail);
    Optional<Users> findByActivationCode(String code);
    Optional<Users> findByPasswordResetCode(String code);
}
