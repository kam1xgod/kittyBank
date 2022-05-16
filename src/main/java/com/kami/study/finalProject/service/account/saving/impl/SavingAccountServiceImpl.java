package com.kami.study.finalProject.service.account.saving.impl;

import com.kami.study.finalProject.model.enums.AccountStatus;
import com.kami.study.finalProject.model.enums.AccountType;
import com.kami.study.finalProject.repository.AccountRepository;
import com.kami.study.finalProject.service.account.saving.SavingAccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;

@Service
@Slf4j
@RequiredArgsConstructor
public class SavingAccountServiceImpl implements SavingAccountService {

    private final AccountRepository accountRepository;

    @Override
    public void capitalize() {
        accountRepository.findByType(AccountType.SAVING)
                .stream()
                .filter(account -> account.getStatus().equals(AccountStatus.ACTIVE))
                .filter(account -> account.getLastTransactionDate().toLocalDate().getDayOfMonth() == LocalDate.now().getDayOfMonth())
                .filter(account -> account.isCapitalized())
                .forEach(account -> {
                    account.addMoney(account.getMinMonth() * account.getPercentage()/100);
                    account.setMinMonth(account.getBalance());
                });
    }

    @Override
    public void setMinMonthAmount() {
        accountRepository.findByType(AccountType.SAVING)
                .stream()
                .filter(account -> account.getStatus().equals(AccountStatus.ACTIVE))
                .filter(account -> account.getLastTransactionDate().toLocalDate().getMonthValue() == LocalDate.now().getMonthValue() ||
                        account.getLastTransactionDate().toLocalDate().getMonthValue() == LocalDate.now().getMonthValue() - 1)
                .filter(account -> account.getLastTransactionDate().toLocalDate().getDayOfMonth() < LocalDate.now().getDayOfMonth())
                .forEach(account -> account.setMinMonth(account.getMinMonth() < account.getBalance() ?
                        account.getMinMonth() :
                        account.getBalance()));
    }

    @Override
    public void autoAdjust() {
        accountRepository.findByType(AccountType.SAVING)
                .stream()
                .filter(account -> account.getStatus().equals(AccountStatus.ACTIVE))
                .filter(account -> account.getDateOpened().toLocalDate().getYear() == LocalDate.now().getYear())
                .filter(account -> account.getDateOpened().toLocalDate().getMonthValue() == LocalDate.now().getMonthValue())
                .forEach(account -> account.setDateOpened(Date.valueOf(account.getDateOpened().toLocalDate().plusYears(account.getYears()))));
    }
}
