package com.kami.study.finalProject.DTO.card;

import lombok.Data;

@Data
public class CardResponse {
    private Long id;
    private String number;
    private String month_year;
    private String cvv;

}
