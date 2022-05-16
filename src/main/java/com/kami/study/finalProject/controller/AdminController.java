package com.kami.study.finalProject.controller;

import com.kami.study.finalProject.DTO.account.AccountResponse;
import com.kami.study.finalProject.DTO.credit.CreditResponse;
import com.kami.study.finalProject.DTO.creditAccountRequest.CreditAccountRequestResponse;
import com.kami.study.finalProject.DTO.savingPlan.SavingPlanRequest;
import com.kami.study.finalProject.DTO.savingPlan.SavingPlanResponse;
import com.kami.study.finalProject.DTO.transfer.TransferResponse;
import com.kami.study.finalProject.DTO.user.UserResponse;
import com.kami.study.finalProject.mapper.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('ADMIN')")
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final UserMapper userMapper;
    private final TransferMapper transferMapper;
    private final AccountMapper accountMapper;
    private final SavingPlanMapper savingPlanMapper;
    private final CreditMapper creditMapper;
    private final CreditAccountRequestMapper requestMapper;

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userMapper.findAll());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userMapper.findUserById(id));
    }

    @GetMapping("/users/{mail}")
    public ResponseEntity<UserResponse> getUserByMail(@PathVariable String mail) {
        return ResponseEntity.ok(userMapper.findUserByMail(mail));
    }

    @GetMapping("/users/{id}/transfers")
    public ResponseEntity<List<TransferResponse>> getUserTransfers(@PathVariable Long id) {
        return ResponseEntity.ok(transferMapper.findByUserId(id));
    }

    @GetMapping("/users/{id}/accounts")
    public ResponseEntity<List<AccountResponse>> getUserAccounts(@PathVariable Long id) {
        return ResponseEntity.ok(accountMapper.findByUserId(id));
    }

    @GetMapping("/accounts")
    public ResponseEntity<List<AccountResponse>> getAllAccounts() {
        return ResponseEntity.ok(accountMapper.findAll());
    }

    @GetMapping("/transfers")
    public ResponseEntity<List<TransferResponse>> getAllTransfers() {
        return ResponseEntity.ok(transferMapper.findAll());
    }

    @GetMapping("/savings")
    ResponseEntity<List<SavingPlanResponse>> findAllSavingPlans() {
        return ResponseEntity.ok(savingPlanMapper.findAll());
    }

    @GetMapping("/savings/{id}")
    ResponseEntity<SavingPlanResponse> findSavingPlanById(@PathVariable Long id) {
        return ResponseEntity.ok(savingPlanMapper.findById(id));
    }


    @PostMapping("/savings/add")
    ResponseEntity<SavingPlanResponse> createNewSavingPlan(@Valid @RequestPart("plan") SavingPlanRequest savingPlanRequest,
                                                           BindingResult bindingResult) {
        return ResponseEntity.ok(savingPlanMapper.create(savingPlanRequest, bindingResult));
    }

    @PostMapping("/savings/update/{id}")
    ResponseEntity<SavingPlanResponse> updateSavingPlan(@Valid @RequestPart("plan") SavingPlanRequest savingPlanRequest,
                                                        @PathVariable Long id,
                                                        BindingResult bindingResult) {
        return ResponseEntity.ok(savingPlanMapper.update(id, savingPlanRequest, bindingResult));
    }

    @GetMapping("/credits")
    ResponseEntity<List<CreditResponse>> getAllCredits() {
        return ResponseEntity.ok(creditMapper.findAll());
    }

    @GetMapping("/credits/{id}")
    ResponseEntity<CreditResponse> getCreditById(@PathVariable Long id) {
        return ResponseEntity.ok(creditMapper.findById(id));
    }

    @GetMapping("/credits/requests")
    ResponseEntity<List<CreditAccountRequestResponse>> getAllCreditRequests() {
        return ResponseEntity.ok(requestMapper.findAll());
    }

    @GetMapping("/credits/requests/delete/{mail}")
    ResponseEntity<List<CreditAccountRequestResponse>> deteleCreditAccountRequest(@PathVariable String mail) {
        return ResponseEntity.ok(requestMapper.delete(mail));
    }
}
