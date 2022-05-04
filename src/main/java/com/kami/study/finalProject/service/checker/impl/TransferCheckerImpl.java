package com.kami.study.finalProject.service.checker.impl;

import com.kami.study.finalProject.exception.InsufficientFundsException;
import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Transfer;
import com.kami.study.finalProject.model.enums.AccountStatus;
import com.kami.study.finalProject.service.checker.Checker;
import org.springframework.stereotype.Component;

@Component
public class TransferCheckerImpl implements Checker<Transfer> {
    @Override
    public boolean check(Transfer transfer) { // todo: tests.
        if (!isAmountBiggerThanZero(transfer.getAmount())) {
            transfer.deny();
            throw new UnsupportedOperationException("You can't transfer 0 or less amount of money.");
        }
        if (!isSumMultipleOfHundred(transfer.getAmount())) {
            transfer.deny();
            throw new UnsupportedOperationException("You can't transfer amount that is not multiple of 100");
        }
        if (!isBalanceEnough(transfer.getSender(), transfer.getAmount())) {
            transfer.deny();
            throw new InsufficientFundsException("Not enough money to perform this operation.");
        }
        if (!isAccountActive(transfer.getSender())) {
            transfer.deny();
            throw new UnsupportedOperationException("Account from which you're trying to transfer money is not active.");
        }
        if (!isAccountActive(transfer.getRecipient())) {
            transfer.deny();
            throw new UnsupportedOperationException("Account to which you're trying to transfer money is not active.");
        }
        return true;
    }

    private boolean isBalanceEnough(Account sender, Double amount) {
        return sender.getBalance() >= amount;
    }

    private boolean isSumMultipleOfHundred(Double amount) {
        return amount % 100 == 0;
    }

    private boolean isAmountBiggerThanZero(Double amount) {
        return amount > 0;
    }

    private boolean isAccountActive(Account account) {
        return account.getStatus().equals(AccountStatus.ACTIVE);
    }
}