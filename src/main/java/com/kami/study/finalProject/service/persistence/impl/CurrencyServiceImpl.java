package com.kami.study.finalProject.service.persistence.impl;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.kami.study.finalProject.exception.ApiRequestException;
import com.kami.study.finalProject.model.Currency;
import com.kami.study.finalProject.repository.CurrencyRepository;
import com.kami.study.finalProject.service.persistence.CurrencyService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class CurrencyServiceImpl implements CurrencyService {

  private final CurrencyRepository repository;

  @Override
  public List<Currency> findAll() {
    return repository.findAll();
  }

  @Override
  public Optional<Currency> findById(Long id) {
    return repository.findById(id);
  }

  @Override
  public List<Currency> delete(Currency object) {
    repository.delete(object);
    return repository.findAll();
  }

  @Override
  public Currency create(Currency object) {
    return repository.save(object);
  }

  @Override
  public Currency update(Currency object) {
    return repository.save(object);
  }

  @Override
  public Currency findByName(String name) {
    return repository.findByName(name)
                .orElseThrow(() -> new ApiRequestException("Name not found", HttpStatus.NOT_FOUND));
  }

  @Override
  public Currency findByAccountNumbers(String accountNumbers) {
    return repository.findByAccountNumbers(accountNumbers)
                .orElseThrow(() -> new ApiRequestException("Account numbers not found", HttpStatus.NOT_FOUND));
  }
}
