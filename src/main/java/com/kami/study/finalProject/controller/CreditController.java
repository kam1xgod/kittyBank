package com.kami.study.finalProject.controller;

import com.kami.study.finalProject.DTO.credit.CreditRequest;
import com.kami.study.finalProject.DTO.credit.CreditResponse;
import com.kami.study.finalProject.mapper.CreditMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/v1/credit")
@RequiredArgsConstructor
public class CreditController {

    private final CreditMapper creditMapper;

    @PostMapping("/new/")
    public ResponseEntity<CreditResponse> createNewCredit(@Valid @RequestBody CreditRequest creditRequest,
                                                                BindingResult bindingResult) {
        return ResponseEntity.ok(creditMapper.create(creditRequest, bindingResult));
    }
}
