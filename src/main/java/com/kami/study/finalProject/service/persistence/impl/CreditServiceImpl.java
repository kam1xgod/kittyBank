package com.kami.study.finalProject.service.persistence.impl;

import com.kami.study.finalProject.exception.ApiRequestException;
import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Credit;
import com.kami.study.finalProject.model.enums.AccountStatus;
import com.kami.study.finalProject.model.enums.AccountType;
import com.kami.study.finalProject.model.enums.CreditStatus;
import com.kami.study.finalProject.repository.CreditRepository;
import com.kami.study.finalProject.service.persistence.CreditService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
public class CreditServiceImpl implements CreditService {

    private final CreditRepository creditRepository;

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
        return creditRepository.findAll();
    }

    @Override
    public Credit create(Credit credit) {
        checkRequirements(credit);
        credit.setDate(Date.valueOf(LocalDate.now()));
        credit.setStatus(CreditStatus.WAITING);
        credit.setPenalty(0.01);
        credit.setDays(30); // todo: remake with this: LocalDate.now().getMonth().maxLength()
        creditRepository.save(credit);
        return credit;
    }

    @Override
    public Credit update(Credit credit) {
        creditRepository.save(credit);
        return credit;
    }


    // todo: move this method into checker class.
    @Override
    public void checkRequirements(Credit credit) {
        if (credit.getAmount() <= 0) {
            throw new ApiRequestException("Credit amount should be higher than zero", HttpStatus.BAD_REQUEST);
        }
        if (!credit.getAccount().getType().equals(AccountType.CREDIT)) {
            throw new ApiRequestException("Account type is not Credit.", HttpStatus.BAD_REQUEST);
        }
        if (!credit.getAccount().getStatus().equals(AccountStatus.ACTIVE)) {
            throw new ApiRequestException("Account is not active.", HttpStatus.BAD_REQUEST);
        }
        if (credit.getAccount().getCreditLimit() < credit.getAmount()) {
            throw new ApiRequestException("Account's credit limit is lower than credit you want to take.", HttpStatus.BAD_REQUEST);
        }
        for (Credit c : creditRepository.findByAccount_Number(credit.getAccount().getNumber())) {
            if (c.getStatus().equals(CreditStatus.OVERDUE)) {
                throw new ApiRequestException("This account have an overdue credit.", HttpStatus.BAD_REQUEST);
            }
        }
    }

    // todo: think of closing credits. actually: I should find a way to create transfers from any account to credit account.
    // todo: when all loan was payed - credit can be closed.
}
