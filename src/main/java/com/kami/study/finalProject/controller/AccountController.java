package com.kami.study.finalProject.controller;

import com.kami.study.finalProject.DTO.account.AccountRequest;
import com.kami.study.finalProject.DTO.account.AccountResponse;
import com.kami.study.finalProject.mapper.AccountMapper;
import com.kami.study.finalProject.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/account")
@RequiredArgsConstructor
public class AccountController {

    private final AccountMapper accountMapper;

    @PostMapping("/new")
    public ResponseEntity<AccountResponse> createNewAccount(@Valid @RequestPart("account") AccountRequest accountRequest,
                                                            BindingResult bindingResult) {
        return ResponseEntity.ok(accountMapper.create(accountRequest, bindingResult));
    }

    @GetMapping("/activate/{code}")
    public ResponseEntity<String> activateEmailCode(@PathVariable String code) {
        return ResponseEntity.ok(accountMapper.activateAccount(code));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAccount(@AuthenticationPrincipal UserPrincipal user, @PathVariable Long id) {
    return ResponseEntity.ok(accountMapper.delete(user.getId(), id));
  }
}
