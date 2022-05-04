package com.kami.study.finalProject.DTO.transfer;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class TransferRequest {
    @NotNull(message = "Fill the input field.")
    private Double amount;

    @NotBlank(message = "Fill your card or account number.")
    private String senderNumber;

    @NotBlank(message = "Fill recipient card or account number.")
    private String recipientNumber;
}
