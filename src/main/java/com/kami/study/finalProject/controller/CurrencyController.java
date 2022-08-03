package com.kami.study.finalProject.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kami.study.finalProject.DTO.currency.CurrencyResponse;
import com.kami.study.finalProject.mapper.CurrencyMapper;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/currency")
public class CurrencyController {

  private final CurrencyMapper currencyMapper;

  @GetMapping("")
  public ResponseEntity<List<CurrencyResponse>> getAll() {
    return ResponseEntity.ok(currencyMapper.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<CurrencyResponse> getById(@PathVariable Long id) {
    return ResponseEntity.ok(currencyMapper.findById(id));
  }

  @GetMapping("/{name}")
  public ResponseEntity<CurrencyResponse> getByName(@PathVariable String name) {
    return ResponseEntity.ok(currencyMapper.findByName(name));
  }
}
