package com.kami.study.finalProject.DTO.credit;

import com.kami.study.finalProject.model.enums.Currency;
import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Date;

@Data
public class CreditRequest {
    @NotNull(message = "Fill the input field.")
    private Double amount;

    private Currency currency;

    @NotBlank(message = "Fill the input field.")
    private String accountNumber;

    @NotNull(message = "Fill the input field.")
    private Double percentage;

    // todo: some fields can be empty actually.

    // todo: this should be only in AdminController.

    // todo: think about your queries in repositories.
}
