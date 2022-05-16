package com.kami.study.finalProject.controller;

import com.kami.study.finalProject.DTO.savingPlan.SavingPlanResponse;
import com.kami.study.finalProject.mapper.SavingPlanMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/savings")
@RequiredArgsConstructor
public class SavingPlansController {

    private final SavingPlanMapper savingPlanMapper;

    @GetMapping("/all")
    ResponseEntity<List<SavingPlanResponse>> listAll() {
        return ResponseEntity.ok(savingPlanMapper.findAll());
    }
}
