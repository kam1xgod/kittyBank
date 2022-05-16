package com.kami.study.finalProject.DTO.savingPlan;

import lombok.Data;

@Data
public class SavingPlanResponse {
    private Long id;
    private Long years;
    private Double percentage;
    private boolean canWithdraw;
    private boolean canDeposit;
    private boolean closable;
    private boolean capitalized;
    private Long min;
    private Long max;
}
