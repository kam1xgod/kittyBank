package com.kami.study.finalProject.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Bank {
    SBER("00000", "35000"),
    TINK("35000", "68000"),
    VTB("68000", "100000");

    private final String min;
    private final String max;

    // todo: add first 5-7 card numbers as a field. they will be different in each bank.
}
