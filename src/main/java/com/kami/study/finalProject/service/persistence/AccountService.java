package com.kami.study.finalProject.service.persistence;

import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Transfer;
import com.kami.study.finalProject.model.enums.PaymentSystem;

import java.util.List;

public interface AccountService extends DefaultService<Account> {
    List<Transfer> findTransfersByAccountId(Long AccountId);

    Account create(Account account, PaymentSystem paymentSystem);

    Account findByAccountNumber(String number);
}
