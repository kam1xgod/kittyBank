package com.kami.study.finalProject.service.card;

import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Card;
import com.kami.study.finalProject.model.enums.AccountType;
import com.kami.study.finalProject.model.enums.CardType;
import com.kami.study.finalProject.model.enums.PaymentSystem;
import com.kami.study.finalProject.service.card.CardCVVGenerator;
import com.kami.study.finalProject.service.card.CardMonthAndYearGenerator;
import com.kami.study.finalProject.service.card.CardNumberGenerator;

public class CardFactory {
    public static Card create(Account account, PaymentSystem paymentSystem) {
        return Card.builder()
                .withType(account.getType().equals(AccountType.CARD)
                        ? CardType.DEBIT
                        : CardType.CREDIT)
                .withCvv(CardCVVGenerator.generate())
                .withNumber(CardNumberGenerator.generate(paymentSystem))
                .withMonthYear(CardMonthAndYearGenerator.generate())
                .build();
    }

}
