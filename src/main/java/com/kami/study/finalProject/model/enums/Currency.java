package com.kami.study.finalProject.model.enums;

import lombok.Getter;

@Getter
public enum Currency {
    RUB("810"),
    USD("840"),
    EUR("978");

    private final String accountNums;


    Currency(String accountNums) {
        this.accountNums = accountNums;
    }
}
