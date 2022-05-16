package com.kami.study.finalProject.DTO.account;

import com.kami.study.finalProject.DTO.card.CardResponse;
import com.kami.study.finalProject.model.enums.AccountStatus;
import com.kami.study.finalProject.model.enums.AccountType;
import com.kami.study.finalProject.model.enums.Currency;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Date;

@Data
public class AccountResponse {
    private Long id;
    private String number;
    private BigDecimal balance;
    private Currency currency;
    private Date lastTransactionDate;
    private AccountType type;
    private AccountStatus status;
    private CardResponse card;

    private Double creditLimit;
    private Long days;

    private Double percentage;
    private Long years;
    private boolean canWithdraw;
    private boolean canDeposit;
    private boolean closable;
    private boolean capitalized;
    private Long min;
    private Long max;
    private String dateOpened;
}
