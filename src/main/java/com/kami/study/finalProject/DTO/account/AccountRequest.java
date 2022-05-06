package com.kami.study.finalProject.DTO.account;

import com.kami.study.finalProject.model.enums.AccountType;
import com.kami.study.finalProject.model.enums.Currency;
import com.kami.study.finalProject.model.enums.PaymentSystem;
import lombok.Data;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotNull;

@Data
public class AccountRequest {
    @Nullable
    private Currency currency;

    @NotNull(message = "Fill the input field.")
    private AccountType type;

    // todo: make different classes for credit account, card account and savings account requests.
    // todo: and responses.

    @Nullable
    private Double creditLimit;

    @Nullable
    private PaymentSystem paymentSystem;

    @NotNull(message = "Fill email.")
    private String mail;
}
