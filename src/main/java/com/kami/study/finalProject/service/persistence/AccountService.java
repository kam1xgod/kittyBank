package com.kami.study.finalProject.service.persistence;

import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Transfer;
import com.kami.study.finalProject.model.enums.AccountStatus;
import com.kami.study.finalProject.model.enums.AccountType;
import com.kami.study.finalProject.model.enums.PaymentSystem;

import java.util.List;

public interface AccountService extends DefaultService<Account> {
    List<Transfer> findTransfersByAccountId(Long AccountId);

    Account findByAccountNumber(String number);

    Account findByCardNumber(String number);

    List<Account> findByUserMail(String mail);

    List<Account> findByUserId(Long id);

    String activateAccount(String code);

    List<Account> findByOwnerMailAndType(String mail, AccountType type);

    List<Account> findByOwnerMailAndTypeAndStatus(String mail, AccountType type, AccountStatus status);

    Account create(Account account, PaymentSystem paymentSystem);

    void checkAllSavingAccounts();

    void checkAllCreditAccounts();
}
