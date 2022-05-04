package com.kami.study.finalProject.service.persistence;

import com.kami.study.finalProject.model.Transfer;
import com.kami.study.finalProject.model.User;

import java.util.List;

public interface TransferService extends DefaultService<Transfer> {
    List<Transfer> commitTransfer(Transfer transfer);
    boolean checkTransfer(Transfer transfer);
    Transfer create(Double amount, User sender, User recipient);
    Transfer create(Double amount, String senderCardOrAccountNumber, String recipientCardOrAccountNumber);
}
