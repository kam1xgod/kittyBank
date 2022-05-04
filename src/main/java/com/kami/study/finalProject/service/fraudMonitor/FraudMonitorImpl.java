package com.kami.study.finalProject.service.fraudMonitor;

import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Transfer;
import com.kami.study.finalProject.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class FraudMonitorImpl implements FraudMonitor {
    @Override
    public boolean checkSenderAccount(Account senderAccount) {
        return false;
    }

    @Override
    public boolean checkRecipientAccount(Account recipientAccount) {
        return false;
    }

    @Override
    public boolean checkSender(User sender) {
        return false;
    }

    @Override
    public boolean checkRecipient(User recipient) {
        return false;
    }

    @Override
    public boolean checkSum(Transfer transfer) {
        return false;
    }
    // todo: implement.
}
