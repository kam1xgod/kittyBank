package com.kami.study.finalProject.DTO.card;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class CardRequest {
    @NotBlank(message = "Fill the input field.")
    private String number;

    @NotBlank(message = "Fill the input field.")
    private String month_year;

    @NotBlank(message = "Fill the input field.")
    private String cvv;
}
