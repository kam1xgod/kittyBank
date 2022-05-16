package com.kami.study.finalProject.repository;

import com.kami.study.finalProject.model.CreditAccountRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CreditAccountRequestRepository extends JpaRepository<CreditAccountRequest, Long> {
    CreditAccountRequest findByUser_Mail(String mail);

}
