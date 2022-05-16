package com.kami.study.finalProject.service.fraudMonitor;

import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Transfer;
import com.kami.study.finalProject.repository.TransferRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class FraudMonitorImpl implements FraudMonitor {

    private final TransferRepository transferRepository;

    private boolean checkSenderAccount(Account senderAccount) {
        return checkAccount(senderAccount);
    }

    private boolean checkRecipientAccount(Account recipientAccount) {
        return checkAccount(recipientAccount);
    }

    private boolean checkAccount(Account account) {
        List<Transfer> concatList = transferRepository.getBySender_Id(account.getId());
        concatList.addAll(transferRepository.getByRecipient_Id(account.getId()));
        return
                concatList
                        .stream().map(Transfer::getAmount)
                        .filter(amount -> amount > 1_000_00L)
                        .count() <= 10.0 &&
                        concatList
                                .stream().map(Transfer::getDateTime)
                                .filter(date -> date.equals(LocalDateTime.now()))
                                .count() <= 4.0 &&
                        concatList
                                .stream()
                                .map(Transfer::getAmount)
                                .filter(amount -> amount < 10L)
                                .count() < 5.0;
    }

    private boolean checkSum(Transfer transfer) {
        return transfer.getAmount() <= 1.0 && transfer.getAmount() >= 100_000_000L;
    }

    @Override
    public boolean checkTransfer(Transfer transfer) {
        return checkSenderAccount(transfer.getSender()) &&
                checkRecipientAccount(transfer.getRecipient()) &&
                checkSum(transfer);
    }

    // todo: send email for completing transfer.
}
