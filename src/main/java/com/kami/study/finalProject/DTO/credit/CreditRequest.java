package com.kami.study.finalProject.DTO.credit;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class CreditRequest {
    @NotNull(message = "Fill the input field.")
    private Double amount;

    @NotBlank(message = "Fill the input field.")
    private String accountNumber;
}
