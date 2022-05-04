package com.kami.study.finalProject.service.fraudMonitor;

import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Transfer;
import com.kami.study.finalProject.model.User;

public interface FraudMonitor {
    boolean checkSenderAccount(Account senderAccount);
    boolean checkRecipientAccount(Account recipientAccount);
    boolean checkSender(User sender);
    boolean checkRecipient(User recipient);
    boolean checkSum(Transfer transfer);
}
