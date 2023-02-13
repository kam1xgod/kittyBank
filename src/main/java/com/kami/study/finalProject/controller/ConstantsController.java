package com.kami.study.finalProject.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kami.study.finalProject.DTO.constants.ConstantsResponse;
import com.kami.study.finalProject.mapper.ConstantsMapper;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/constants")
public class ConstantsController {

  private final ConstantsMapper constantsMapper;

  @GetMapping("")
  public ResponseEntity<List<ConstantsResponse>> getAll() {
    return ResponseEntity.ok(constantsMapper.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<ConstantsResponse> getById(@PathVariable Long id) {
    return ResponseEntity.ok(constantsMapper.findById(id));
  }

  @GetMapping("/{name}")
  public ResponseEntity<ConstantsResponse> getByName(@PathVariable String name) {
    return ResponseEntity.ok(constantsMapper.findByName(name));
  }
}
