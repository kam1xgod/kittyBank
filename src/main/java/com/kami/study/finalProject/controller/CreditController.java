package com.kami.study.finalProject.controller;

import com.kami.study.finalProject.DTO.credit.CreditRequest;
import com.kami.study.finalProject.DTO.credit.CreditResponse;
import com.kami.study.finalProject.DTO.creditAccountRequest.CreditAccountRequestRequest;
import com.kami.study.finalProject.DTO.creditAccountRequest.CreditAccountRequestResponse;
import com.kami.study.finalProject.mapper.CreditAccountRequestMapper;
import com.kami.study.finalProject.mapper.CreditMapper;
import com.kami.study.finalProject.model.CreditAccountRequest;
import com.kami.study.finalProject.security.UserPrincipal;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/credit")
@RequiredArgsConstructor
public class CreditController {

  private final CreditMapper creditMapper;
  private final CreditAccountRequestMapper requestMapper;

  @PostMapping("/new")
  public ResponseEntity<CreditResponse> createNewCredit(@Valid @RequestPart("credit") CreditRequest creditRequest,
      BindingResult bindingResult) {
    return ResponseEntity.ok(creditMapper.create(creditRequest, bindingResult));
  }

  @PostMapping("/{id}/pay")
  public ResponseEntity<List<CreditResponse>> payCredit(@AuthenticationPrincipal UserPrincipal user, @PathVariable Long id) {
      return ResponseEntity.ok(creditMapper.payCredit(user.getMail(), id)); 
  }

  @PostMapping("/request")
  public ResponseEntity<CreditAccountRequestResponse> requestNewCreditAccount(
      @Valid @RequestPart("account-request") CreditAccountRequestRequest creditAccountRequestRequest, BindingResult bindingResult) {
    return ResponseEntity.ok(requestMapper.create(creditAccountRequestRequest, bindingResult));
  }
}
