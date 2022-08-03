package com.kami.study.finalProject.DTO.currency;

import lombok.Data;

@Data
public class CurrencyResponse {
  private Long id;
  private String name;
  private String symbol;
  private String accountNumbers;
}
