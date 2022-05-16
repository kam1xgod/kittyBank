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
import com.kami.study.finalProject.service.account.credit.CreditAccountService;
import com.kami.study.finalProject.service.account.saving.SavingAccountService;
import com.kami.study.finalProject.service.card.CardFactory;
import com.kami.study.finalProject.service.email.MailSender;
import com.kami.study.finalProject.service.persistence.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final TransferRepository transferRepository;
    private final CardRepository cardRepository;
    private final MailSender mailSender;
    private final SavingAccountService savingAccountService;
    private final CreditAccountService creditAccountService;

    @Value("${hostname}")
    private String hostname;

    @Override
    public List<Account> findAll() {
        return accountRepository.findAll();
    }

    @Override
    public Optional<Account> findById(Long id) {
        return accountRepository.findById(id);
    }

    @Override
    public List<Account> findByOwnerMailAndType(String mail, AccountType type) {
        return accountRepository.findByOwner_MailAndType(mail, type);
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
    public List<Account> findByUserMail(String mail) {
        return accountRepository.findByOwner_Mail(mail);
    }

    @Override
    public List<Account> findByUserId(Long id) {
        return accountRepository.findByOwner_Id(id);
    }

    @Override
    public List<Transfer> findTransfersByAccountId(Long accountId) {
        return transferRepository.getTransfersByAccountId(accountId);
    }

    @Override
    public List<Account> delete(Account account) {
        accountRepository.delete(account);
        return findAll();
    }

    @Override
    public Account update(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public Account create(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public Account create(Account account, PaymentSystem paymentSystem) {
        if ((!account.getType().equals(AccountType.GENERAL)
                || !account.getType().equals(AccountType.SAVING))
                && paymentSystem != null) {
            Card card = CardFactory.create(account, paymentSystem);
            cardRepository.save(card);
            account.setCard(card);
        }
        account.setActivationCode(UUID.randomUUID().toString());
        accountRepository.save(account);

        String subject = "Activation code";
        String template = "account-activation-template";
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("firstname", account.getOwner().getFirstname());
        attributes.put("activationUrl", "http://" + hostname + "/account/activate/" + account.getActivationCode());
        mailSender.sendMessageHtml(account.getOwner().getMail(), subject, template, attributes);
        return account;
    }

    @Override
    public String activateAccount(String code) {
        Account account = accountRepository.findByActivationCode(code)
                .orElseThrow(() -> new ApiRequestException("Activation code not found", HttpStatus.NOT_FOUND));
        account.setActivationCode(null);
        account.setStatus(AccountStatus.ACTIVE);
        accountRepository.save(account);
        return "Account successfully activated.";
    }

    @Override
    public void checkAllSavingAccounts() {
        savingAccountService.autoAdjust();
        savingAccountService.setMinMonthAmount();
        savingAccountService.capitalize();
    }

    @Override
    public void checkAllCreditAccounts() {
        creditAccountService.checkAllCredits();
        creditAccountService.checkAllCreditAccount();
        creditAccountService.checkAllCards();
    }
}
