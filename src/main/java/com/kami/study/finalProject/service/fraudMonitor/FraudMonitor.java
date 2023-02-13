package com.kami.study.finalProject.service.fraudMonitor;

import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Transfer;
import com.kami.study.finalProject.model.Users;

public interface FraudMonitor {
    boolean checkTransfer(Transfer transfer);
}
