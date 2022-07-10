package com.kami.study.finalProject.controller;

import com.kami.study.finalProject.DTO.credit.CreditRequest;
import com.kami.study.finalProject.DTO.credit.CreditResponse;
import com.kami.study.finalProject.DTO.creditAccountRequest.CreditAccountRequestResponse;
import com.kami.study.finalProject.mapper.CreditAccountRequestMapper;
import com.kami.study.finalProject.mapper.CreditMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("api/v1/credit")
@RequiredArgsConstructor
public class CreditController {

    private final CreditMapper creditMapper;
    private final CreditAccountRequestMapper requestMapper;
    @PostMapping("/new/")
    public ResponseEntity<CreditResponse> createNewCredit(@Valid @RequestBody CreditRequest creditRequest,
                                                                BindingResult bindingResult) {
        return ResponseEntity.ok(creditMapper.create(creditRequest, bindingResult));
    }

    @GetMapping("/request/{mail}")
    public ResponseEntity<CreditAccountRequestResponse> requestNewCreditAccount(@PathVariable String mail) {
        return ResponseEntity.ok(requestMapper.create(mail));
    }
}
