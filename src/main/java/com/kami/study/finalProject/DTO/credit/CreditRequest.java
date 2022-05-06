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

    @NotNull(message = "Fill the input field.")
    private Double percentage; // todo: move percentage to Account entity. I need it 'cuz percentage controlled by operator. Credits in one account will have one percentage.

    // todo: some fields can be empty actually.

    // todo: this should be only in AdminController.

    // todo: think about your queries in repositories.
}
