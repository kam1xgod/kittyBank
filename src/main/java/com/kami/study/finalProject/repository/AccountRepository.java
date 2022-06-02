package com.kami.study.finalProject.repository;

import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Card;
import com.kami.study.finalProject.model.User;
import com.kami.study.finalProject.model.enums.AccountStatus;
import com.kami.study.finalProject.model.enums.AccountType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByNumber(String number);
    Optional<Account> findByCardId(Long cardId);

    Optional<Account> findFirstByOwnerIdOrderByIdDesc(Long userId);
    Optional<Account> findFirstByOwner(User user);

    Optional<Account> findByCard_Number(String cardNumber);

    List<Account> findByOwner_Mail(String mail);

    List<Account> findByOwner_Id(Long id);

    Optional<Account> findByActivationCode(String code);

    List<Account> findByOwner_MailAndType(String mail, AccountType type);

    List<Account> findByType(AccountType type);

    List<Account> findAllByStatus(AccountStatus accountStatus);
}
