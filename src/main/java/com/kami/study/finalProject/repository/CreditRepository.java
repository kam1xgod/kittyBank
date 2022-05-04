package com.kami.study.finalProject.repository;

import com.kami.study.finalProject.model.Credit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CreditRepository extends JpaRepository<Credit, Long> {
    List<Credit> findByAccount_Number(String accountNumber);
}
