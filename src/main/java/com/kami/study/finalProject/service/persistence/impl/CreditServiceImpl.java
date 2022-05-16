package com.kami.study.finalProject.service.persistence.impl;

import com.kami.study.finalProject.exception.ApiRequestException;
import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Credit;
import com.kami.study.finalProject.model.enums.AccountStatus;
import com.kami.study.finalProject.model.enums.AccountType;
import com.kami.study.finalProject.model.enums.CreditStatus;
import com.kami.study.finalProject.repository.CreditRepository;
import com.kami.study.finalProject.service.checker.impl.CreditChecker;
import com.kami.study.finalProject.service.persistence.CreditService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
public class CreditServiceImpl implements CreditService {

    private final CreditRepository creditRepository;
    private final CreditChecker creditChecker;

    @Override
    public List<Credit> findAll() {
        return creditRepository.findAll();
    }

    @Override
    public Optional<Credit> findById(Long id) {
        return creditRepository.findById(id);
    }

    @Override
    public List<Credit> delete(Credit credit) {
        creditRepository.delete(credit);
        return findAll();
    }

    @Override
    public Credit create(Credit credit) {
        creditChecker.check(credit);

        credit.setCommission();
        credit.setDays();
        credit.calculateTotal();
        creditRepository.save(credit);
        return credit;
    }

    @Override
    public Credit update(Credit credit) {
        creditRepository.save(credit);
        return credit;
    }

    @Override
    public List<Credit> findByAccountId(Long id) {
        return creditRepository.findByAccount_Id(id);
    }

    @Override
    public List<Credit> findByAccountNumber(String number) {
        return creditRepository.findByAccount_Number(number);
    }

    @Override
    public List<Credit> findByUserMail(String mail) {
        return creditRepository.findByAccount_Owner_Mail(mail);
    }

    @Override
    public List<Credit> findByCardNumber(String number) {
        return creditRepository.findByAccount_Card_Number(number);
    }


}
