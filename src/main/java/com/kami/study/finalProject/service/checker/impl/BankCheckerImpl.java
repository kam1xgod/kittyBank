package com.kami.study.finalProject.service.checker.impl;

import com.kami.study.finalProject.model.enums.CommissionType;
import com.kami.study.finalProject.service.checker.Checker;

public class BankCheckerImpl implements Checker<String> {
    @Override
    public boolean check(String cardNumber) {
        // todo: implement. if same - true, otherwise - false.
        return true;
    }
}
