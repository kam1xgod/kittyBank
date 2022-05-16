package com.kami.study.finalProject.service.checker.impl;

import com.kami.study.finalProject.exception.ApiRequestException;
import com.kami.study.finalProject.model.Credit;
import com.kami.study.finalProject.model.enums.AccountStatus;
import com.kami.study.finalProject.model.enums.AccountType;
import com.kami.study.finalProject.model.enums.CreditStatus;
import com.kami.study.finalProject.repository.CreditRepository;
import com.kami.study.finalProject.service.checker.Checker;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class CreditChecker implements Checker<Credit> {

    private final CreditRepository creditRepository;

    @Override
    public boolean check(Credit credit) {
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
        return true;
    }
}
