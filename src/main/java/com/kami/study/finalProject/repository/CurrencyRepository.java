package com.kami.study.finalProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kami.study.finalProject.model.Currency;

import java.util.Optional;

@Repository
public interface CurrencyRepository extends JpaRepository<Currency, Long> {
    Optional<Currency> findByName(String name);

    Optional<Currency> findByAccountNumbers(String accountNumbers);
}
