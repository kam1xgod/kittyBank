package com.kami.study.finalProject.DTO.account;

import com.kami.study.finalProject.model.enums.AccountStatus;
import com.kami.study.finalProject.model.enums.AccountType;
import com.kami.study.finalProject.model.enums.Currency;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;

@Data
public class AccountResponse {
    private Long id;
    private String number;
    private BigDecimal balance;
    private Currency currency;
    private Date lastTransactionDate;
    private AccountType type;
    private Double creditLimit;
    private LocalDate creditDate;
    private AccountStatus status;
}
