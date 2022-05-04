package com.kami.study.finalProject.service.factory;

import com.kami.study.finalProject.DTO.account.AccountRequest;
import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Card;
import com.kami.study.finalProject.model.User;
import com.kami.study.finalProject.model.enums.AccountType;
import com.kami.study.finalProject.model.enums.CardType;
import com.kami.study.finalProject.model.enums.Currency;
import com.kami.study.finalProject.model.enums.PaymentSystem;
import com.kami.study.finalProject.security.UserPrincipal;
import com.kami.study.finalProject.service.card.CardCVVGenerator;
import com.kami.study.finalProject.service.card.CardMonthAndYearGenerator;
import com.kami.study.finalProject.service.card.CardNumberGenerator;

import java.sql.Date;
import java.time.LocalDate;

public class AccountFactory {
    public static Account create(AccountRequest accountRequest) {
        return Account.builder()
                .type(accountRequest.getType())
                .currency(accountRequest.getCurrency())
                .lastTransactionDate(Date.valueOf(LocalDate.now()))
                .build();
    }
    // todo: add create method for savings account.
}
