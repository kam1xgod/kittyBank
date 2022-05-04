package com.kami.study.finalProject.service.persistence;

import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Credit;

public interface CreditService extends DefaultService<Credit> {
    void checkRequirements(Credit credit);
}
