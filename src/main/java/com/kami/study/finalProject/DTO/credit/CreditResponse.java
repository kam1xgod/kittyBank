package com.kami.study.finalProject.DTO.credit;

import lombok.Data;

import java.sql.Date;

@Data
public class CreditResponse {
    private Long id;
    private Double amount;
    private Date date;
    private Double percentage;

    // todo: this should be sent to user with account number. not this actually. info 'bout credit account which can be opened for them.
}
