package com.kami.study.finalProject.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class CreditService {
    // todo: daily +1% after to_date.
    // todo: lower than 40%.
    // todo: this percent can be modified later.

    // todo: if user have one overdue credit - he can't get another one.
    // todo: if all credits were closed and there is a date to close credit card - it will be closed automatically.

    // so.. Credit card is basically the same as Card class I already have.
    // I have urge to make it abstract and extend two classes from it - DEBIT and CREDIT.
    // OR! I can simply create enum field in Card class.
    // this shit has no benefits.
}
