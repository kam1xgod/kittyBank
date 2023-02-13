package com.kami.study.finalProject.DTO.savingPlan;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class SavingPlanRequest {
    @NotNull
    private Long years;
    @NotNull
    private Double percentage;
    @NotNull
    private boolean canWithdraw;
    @NotNull
    private boolean canDeposit;
    @NotNull
    private boolean closable;
    @NotNull
    private boolean capitalized;
    @NotNull
    private Long min;
    @NotNull
    private Long max;
    @NotNull
    private String imageUrl;
}
