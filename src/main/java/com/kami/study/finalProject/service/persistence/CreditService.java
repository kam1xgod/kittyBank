package com.kami.study.finalProject.service.persistence;

import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Credit;

import java.util.List;

public interface CreditService extends DefaultService<Credit> {
    List<Credit> findByAccountId(Long id);

    List<Credit> findByAccountNumber(String number);

    List<Credit> findByUserMail(String mail);

    List<Credit> findByCardNumber(String number);

    List<Credit> payOrClose(String mail, Long id);
}
