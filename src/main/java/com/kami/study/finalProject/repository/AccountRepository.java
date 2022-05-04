package com.kami.study.finalProject.repository;

import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Card;
import com.kami.study.finalProject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByNumber(String number);
    Optional<Account> findByCardId(Long cardId);

    Optional<Account> findFirstByOwnerIdOrderByIdDesc(Long userId);
    Optional<Account> findFirstByOwner(User user);
}
