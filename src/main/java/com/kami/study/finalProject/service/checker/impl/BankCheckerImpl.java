package com.kami.study.finalProject.service.checker.impl;

import com.kami.study.finalProject.model.enums.Bank;
import com.kami.study.finalProject.model.enums.CommissionType;
import com.kami.study.finalProject.service.checker.Checker;

public class BankCheckerImpl implements Checker<String> {
    @Override
    public boolean check(String cardNumber) {
        final long cardBankDigits = Long.parseLong(cardNumber.substring(1, 6));
        final long bankMinDigits = Long.parseLong(Bank.SBER.getMin());
        final long bankMaxDigits = Long.parseLong(Bank.SBER.getMax());

     // 125423

        return  cardBankDigits >= bankMinDigits &&
                cardBankDigits < bankMaxDigits;
    }
}
