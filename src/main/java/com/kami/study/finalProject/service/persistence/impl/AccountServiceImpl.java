package com.kami.study.finalProject.service.persistence.impl;

import com.kami.study.finalProject.exception.ApiRequestException;
import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Card;
import com.kami.study.finalProject.model.Transfer;
import com.kami.study.finalProject.model.enums.AccountStatus;
import com.kami.study.finalProject.model.enums.AccountType;
import com.kami.study.finalProject.model.enums.PaymentSystem;
import com.kami.study.finalProject.repository.AccountRepository;
import com.kami.study.finalProject.repository.CardRepository;
import com.kami.study.finalProject.repository.TransferRepository;
import com.kami.study.finalProject.service.factory.CardFactory;
import com.kami.study.finalProject.service.persistence.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final TransferRepository transferRepository;
    private final CardRepository cardRepository;

    @Override
    public List<Account> findAll() {
        return accountRepository.findAll();
    }

    @Override
    public Optional<Account> findById(Long id) {
        return accountRepository.findById(id);
    }

    @Override
    public List<Account> delete(Account account) {
        accountRepository.delete(account);
        return findAll();
    }

    @Override
    public Account create(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public Account create(Account account, PaymentSystem paymentSystem) {
        // todo: [ ] when credit account is created - send email with url to activate it.
        // todo: [ ] you will need a number generator for it.
        // todo: [ ] and also col. in DB where it will be stored.
        // todo: [ ] when user clicks on it - account gets status ACTIVATED.
        // todo: [x] otherwise - it will get status DECLINED after 7 days.


        // todo: [ ] think about closing accounts and card.


        if (!account.getType().equals(AccountType.CREDIT)) {
            account.setStatus(AccountStatus.ACTIVE);
        }

        if ((!account.getType().equals(AccountType.GENERAL)
                || !account.getType().equals(AccountType.SAVING))
                && paymentSystem != null) {
            Card card = CardFactory.create(account, paymentSystem);
            cardRepository.save(card);
            account.setCard(card);
        }
        return accountRepository.save(account);
    }

    @Override
    public Account findByAccountNumber(String number) {
        return accountRepository.findByNumber(number).orElseThrow(() -> new ApiRequestException("There's no account with such a number", HttpStatus.BAD_REQUEST));
    }

    @Override
    public Account findByCardNumber(String number) {
        return accountRepository.findByCard_Number(number).orElseThrow(() -> new ApiRequestException("There's no account with this card number", HttpStatus.BAD_REQUEST));
    }

    @Override
    public Account update(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public List<Transfer> findTransfersByAccountId(Long accountId) {
        return transferRepository.getTransfersByAccountId(accountId);
    }
}
