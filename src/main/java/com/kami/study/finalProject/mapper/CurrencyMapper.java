package com.kami.study.finalProject.mapper;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import com.kami.study.finalProject.DTO.currency.CurrencyRequest;
import com.kami.study.finalProject.DTO.currency.CurrencyResponse;
import com.kami.study.finalProject.exception.InputFieldException;
import com.kami.study.finalProject.model.Currency;
import com.kami.study.finalProject.service.persistence.CurrencyService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CurrencyMapper {

  private final CommonMapper commonMapper;
  private final CurrencyService currencyService;

  public List<CurrencyResponse> findAll() {
    return commonMapper.convertToResponseList(currencyService.findAll(), CurrencyResponse.class);
  }

  public CurrencyResponse create(CurrencyRequest currencyRequest, BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      throw new InputFieldException(bindingResult);
    }
    Currency currency = commonMapper.convert(currencyRequest, Currency.class);
    return commonMapper.convert(currencyService.create(currency), CurrencyResponse.class);
  }

  public CurrencyResponse findById(Long id) {
    return commonMapper.convert(currencyService.findById(id), CurrencyResponse.class);
  }

  public CurrencyResponse findByName(String name) {
    return commonMapper.convert(currencyService.findByName(name), CurrencyResponse.class);
  }
}
