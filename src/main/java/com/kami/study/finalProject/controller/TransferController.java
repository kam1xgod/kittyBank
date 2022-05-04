package com.kami.study.finalProject.controller;

import com.kami.study.finalProject.DTO.transfer.TransferRequest;
import com.kami.study.finalProject.DTO.transfer.TransferResponse;
import com.kami.study.finalProject.mapper.TransferMapper;
import com.kami.study.finalProject.model.Transfer;
import com.kami.study.finalProject.security.UserPrincipal;
import com.kami.study.finalProject.service.persistence.TransferService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/transfer")
@RequiredArgsConstructor
public class TransferController {

    private final TransferService transferService;
    private final TransferMapper transferMapper;

    @GetMapping
    public ResponseEntity<List<TransferResponse>> getAll() {
        return ResponseEntity.ok(transferMapper.findAll());
    }

    @PostMapping("/new/")
    public ResponseEntity<List<TransferResponse>> addNew(@Valid @RequestBody TransferRequest transferRequest,
                                                         BindingResult bindingResult) {
        return ResponseEntity.ok(transferMapper.create(transferRequest, bindingResult));
    }
}
