package com.kami.study.finalProject.service.card;

import com.kami.study.finalProject.model.enums.Bank;
import com.kami.study.finalProject.model.enums.PaymentSystem;

import java.util.Random;
import java.util.stream.Collectors;

public class CardNumberGenerator {
    private static final Bank BANK_OWNER = Bank.SBER;
    private static final int AMOUNT_OF_LAST_NUMBERS = 10;
    private static final int STARTS_WITH = 0;
    private static final int ENDS_WITH = 10;


    public static String generate(PaymentSystem paymentSystem) {
        return paymentSystem.getBINCode() +
                new Random().ints(1,
                                Integer.parseInt(BANK_OWNER.getMin()),
                                Integer.parseInt(BANK_OWNER.getMax()))
                        .mapToObj(String::valueOf)
                        .collect(Collectors.joining()) +
                new Random().ints(AMOUNT_OF_LAST_NUMBERS, STARTS_WITH, ENDS_WITH)
                        .mapToObj(String::valueOf)
                        .collect(Collectors.joining());
    }
}
