package com.kami.study.finalProject.service.persistence;

import java.util.Optional;

import com.kami.study.finalProject.model.Currency;

public interface CurrencyService extends DefaultService<Currency> {
    Optional<Currency> findById(Long id);

    Currency findByName(String name);

    Currency findByAccountNumbers(String accountNumbers);
}
