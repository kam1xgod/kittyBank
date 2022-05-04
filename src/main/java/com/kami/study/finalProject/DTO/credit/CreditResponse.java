package com.kami.study.finalProject.DTO.credit;

import com.kami.study.finalProject.model.enums.Currency;
import lombok.Data;

import java.sql.Date;

@Data
public class CreditResponse {
    private Long id;
    private Double amount;
    private Date date;
    private Currency currency;
    private Double percentage;

    // todo: this should be sent to user with account number.
}
