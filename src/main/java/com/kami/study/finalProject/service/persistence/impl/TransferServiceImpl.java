package com.kami.study.finalProject.service.persistence.impl;

import com.kami.study.finalProject.exception.ApiRequestException;
import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Card;
import com.kami.study.finalProject.model.Transfer;
import com.kami.study.finalProject.model.User;
import com.kami.study.finalProject.repository.AccountRepository;
import com.kami.study.finalProject.repository.CardRepository;
import com.kami.study.finalProject.repository.TransferRepository;
import com.kami.study.finalProject.repository.UserRepository;
import com.kami.study.finalProject.service.comission.CommissionService;
import com.kami.study.finalProject.service.persistence.TransferService;
import com.kami.study.finalProject.service.checker.Checker;
import com.kami.study.finalProject.service.checker.impl.TransferCheckerImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class TransferServiceImpl implements TransferService {

    private final TransferRepository transferRepository;
//    private final UserRepository userRepository;
    private final CardRepository cardRepository;
    private final AccountRepository accountRepository;
    private final CommissionService commissionService;
    private final Checker checker = new TransferCheckerImpl();

    @Override
    public List<Transfer> findAll() {
        return transferRepository.findAll();
    }

    @Override
    public Optional<Transfer> findById(Long id) {
        return transferRepository.findById(id);
    }

    @Override
    public List<Transfer> delete(Transfer object) {
        transferRepository.delete(object);
        return findAll();
    }

    @Override
    public Transfer create(Transfer object) {
        return transferRepository.save(object);
    }

    @Override
    public Transfer update(Transfer object) {
        return transferRepository.save(object);
    }

    @Override
    public List<Transfer> commitTransfer(Transfer transfer) {

        // todo: credit closing transfer.
        // todo: it should be only RUB currency.
        // todo: if account was opened in another currency - 10% commission required.
        // todo:

        try {
            if (checkTransfer(transfer)) {
                transfer.setCommission(commissionService.calculate(transfer));
                transfer.getSender().withdrawMoney(transfer.getAmount() + transfer.getCommission());
                transfer.getRecipient().addMoney(transfer.getAmount());
                transfer.setStatus(transfer.getStatus().next());
                transferRepository.save(transfer);
            }
        } catch (Exception e) {
            throw new ApiRequestException(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return findAll();
    }

    @Override
    public boolean checkTransfer(Transfer transfer) {
        return checker.check(transfer);
    }

    @Override
    public Transfer create(Double amount, User sender, User recipient) {
        Account senderAccount = accountRepository.findFirstByOwner(sender)
                .orElseThrow(() ->
                        new ApiRequestException("This user doesn't have any account.", HttpStatus.BAD_REQUEST));

        Account recipientAccount = accountRepository.findFirstByOwner(recipient)
                .orElseThrow(() ->
                        new ApiRequestException("This user doesn't have any account.", HttpStatus.BAD_REQUEST));

        return Transfer.builder()
                .recipient(recipientAccount)
                .sender(senderAccount)
                .amount(amount)
                .build();
    }

    @Override
    public Transfer create(Double amount, String senderCardOrAccountNumber, String recipientCardOrAccountNumber) {
        Account senderAccount = getAccountFromCardOrAccount(senderCardOrAccountNumber);
        Account recipientAccount = getAccountFromCardOrAccount(recipientCardOrAccountNumber);

        return Transfer.builder()
                .recipient(recipientAccount)
                .sender(senderAccount)
                .amount(amount)
                .build();
    }

    private Account getAccountFromCardOrAccount(String cardOrAccountNumber) {
        Account account;
        Card card = cardRepository.findByNumber(cardOrAccountNumber)
                .orElse(null);

        if (card != null) {
            account = accountRepository.findByCardId(card.getId()).orElseThrow(() ->
                    new ApiRequestException("There is no user with this card number.", HttpStatus.BAD_REQUEST));
        } else {
            account = accountRepository.findByNumber(cardOrAccountNumber)
                    .orElseThrow(() -> new ApiRequestException("There is no card or account with this number.", HttpStatus.BAD_REQUEST));
        }
        return account;
    }

    @Deprecated
    private String getCardNumberFromAccountId(Long accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() ->
                        new ApiRequestException("This account doesn't exist.", HttpStatus.BAD_REQUEST));
        if (account.getCard() != null) {
            return account.getCard().getNumber();
        }
        throw new ApiRequestException("This account doesn't have any cards linked to it.", HttpStatus.BAD_REQUEST);
    }
}
