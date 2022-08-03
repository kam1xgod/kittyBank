package com.kami.study.finalProject.DTO.currency;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class CurrencyRequest {
  @NotNull
  private String name;
  @NotNull
  private String symbol;
  @NotNull
  private String accountNumbers;
}
