package com.kami.study.finalProject.controller;

import com.kami.study.finalProject.DTO.account.AccountResponse;
import com.kami.study.finalProject.DTO.credit.CreditResponse;
import com.kami.study.finalProject.DTO.creditAccountRequest.CreditAccountRequestResponse;
import com.kami.study.finalProject.DTO.transfer.TransferResponse;
import com.kami.study.finalProject.DTO.user.UserResponse;
import com.kami.study.finalProject.mapper.AccountMapper;
import com.kami.study.finalProject.mapper.CreditMapper;
import com.kami.study.finalProject.mapper.TransferMapper;
import com.kami.study.finalProject.mapper.UserMapper;
import com.kami.study.finalProject.model.enums.AccountType;
import com.kami.study.finalProject.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import javax.websocket.server.PathParam;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserMapper userMapper;
    private final AccountMapper accountMapper;
    private final TransferMapper transferMapper;
    private final CreditMapper creditMapper;

    @GetMapping("/info")
    public ResponseEntity<UserResponse> userInfo(@AuthenticationPrincipal UserPrincipal user) {
        return ResponseEntity.ok(userMapper.findUserByMail(user.getMail()));
    }

    @GetMapping("/accounts")
    public ResponseEntity<List<AccountResponse>> userAccounts(@AuthenticationPrincipal UserPrincipal user) {
        return ResponseEntity.ok(accountMapper.findByUserMail(user.getMail()));
    }

    @GetMapping("/accounts/card")
    public ResponseEntity<List<AccountResponse>> userActiveAccounts(@AuthenticationPrincipal UserPrincipal user) {
        return ResponseEntity.ok(accountMapper.findAllActiveCardAccounts(user.getMail()));
    }

    @GetMapping("/accounts/credit")
    public ResponseEntity<List<AccountResponse>> getAllActiveCreditAccounts(@AuthenticationPrincipal UserPrincipal user) {
        return ResponseEntity.ok(accountMapper.findAllActiveCreditAccounts(user.getMail()));
    }

    @GetMapping("/accounts/{id}")
    public ResponseEntity<AccountResponse> userAccountById(@PathVariable Long id) {
        return ResponseEntity.ok(accountMapper.findById(id));
    }

    @GetMapping("/accounts/{id}/transfers")
    public ResponseEntity<List<TransferResponse>> userAccountTransfers(@PathVariable Long id) {
        return ResponseEntity.ok(transferMapper.findByAccountId(id));
    }

    @GetMapping("/transfers")
    public ResponseEntity<List<TransferResponse>> userTransfers(@AuthenticationPrincipal UserPrincipal user) {
        return ResponseEntity.ok(transferMapper.findByUserMail(user.getMail()));
    }

    @GetMapping("/transfers/{id}")
    public ResponseEntity<TransferResponse> userTransferById(@PathVariable Long id) {
        return ResponseEntity.ok(transferMapper.findById(id));
    }

    @GetMapping("/credits")
    public ResponseEntity<List<CreditResponse>> getAllUserCredits(@AuthenticationPrincipal UserPrincipal user) {
        return ResponseEntity.ok(creditMapper.getCreditsByMail(user.getMail()));
    }

    @GetMapping("/accounts/{id}/credits")
    public ResponseEntity<List<CreditResponse>> getAllAccountCredits(@PathVariable Long id) {
        return ResponseEntity.ok(creditMapper.getCreditsByAccountId(id));
    }
}

