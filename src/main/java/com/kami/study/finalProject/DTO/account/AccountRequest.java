package com.kami.study.finalProject.DTO.account;

import com.kami.study.finalProject.model.enums.AccountType;
import com.kami.study.finalProject.model.enums.Currency;
import com.kami.study.finalProject.model.enums.PaymentSystem;
import lombok.Data;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotNull;

@Data
public class AccountRequest {
    @NotNull(message = "Fill the input field.")
    private Currency currency;

    @NotNull(message = "Fill the input field.")
    private AccountType type;

    @Nullable
    private PaymentSystem paymentSystem;

    @NotNull(message = "Fill email.")
    private String mail;

    @Nullable
    private Double creditLimit;

    @Nullable
    private Double percentage;

    @Nullable
    private Long days;
}
