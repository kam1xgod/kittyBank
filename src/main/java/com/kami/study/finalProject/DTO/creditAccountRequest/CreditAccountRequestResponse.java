package com.kami.study.finalProject.DTO.creditAccountRequest;

import com.kami.study.finalProject.model.Currency;

import lombok.Data;

@Data
public class CreditAccountRequestResponse {
    private Long id;
    private String mail;
    private Double desiredLimit;
    private Currency currency;
}
