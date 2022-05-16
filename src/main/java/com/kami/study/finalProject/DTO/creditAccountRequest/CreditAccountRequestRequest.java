package com.kami.study.finalProject.DTO.creditAccountRequest;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class CreditAccountRequestRequest {
    @NotNull
    private String mail;
}
