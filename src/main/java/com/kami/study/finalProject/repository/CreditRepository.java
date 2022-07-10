package com.kami.study.finalProject.repository;

import com.kami.study.finalProject.model.Credit;
import com.kami.study.finalProject.model.enums.CreditStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CreditRepository extends JpaRepository<Credit, Long> {
    List<Credit> findByAccount_Number(String accountNumber);

    List<Credit> findByAccount_Id(Long id);

    List<Credit> findByAccount_Owner_Mail(String mail);

    List<Credit> findByAccount_Card_Number(String cardNumber);

    List<Credit> findAllByStatus(CreditStatus creditStatus);
}
