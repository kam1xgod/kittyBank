package com.kami.study.finalProject.DTO.creditAccountRequest;

import lombok.Data;

import javax.validation.constraints.NotNull;

import com.kami.study.finalProject.model.Currency;

@Data
public class CreditAccountRequestRequest {
    @NotNull
    private String mail;
    
    private Double desiredLimit;

    @NotNull(message = "Fill the input field.")
    private Currency currency;
}
