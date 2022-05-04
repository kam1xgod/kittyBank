package com.kami.study.finalProject.model.enums;

import lombok.Getter;

@Getter
public enum CommissionType {
    DEFAULT(0.0),
    ANOTHER_BANK(0.1);

    private final Double commissionPercent;

    CommissionType(Double commissionPercent) {
        this.commissionPercent = commissionPercent;
    }
}
