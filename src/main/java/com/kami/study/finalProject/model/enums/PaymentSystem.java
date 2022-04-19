package com.kami.study.finalProject.model.enums;

import lombok.Getter;

@Getter
public enum PaymentSystem {
    VISA("4"),
    MASTERCARD("5"),
    MIR("2");

    private final String BINCode;

    PaymentSystem(String binCode) {
        BINCode = binCode;
    }
}
