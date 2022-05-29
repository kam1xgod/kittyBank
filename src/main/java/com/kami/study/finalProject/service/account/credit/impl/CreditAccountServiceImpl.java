package com.kami.study.finalProject.service.account.credit.impl;

import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Card;
import com.kami.study.finalProject.model.Credit;
import com.kami.study.finalProject.model.enums.AccountStatus;
import com.kami.study.finalProject.model.enums.CardType;
import com.kami.study.finalProject.model.enums.CreditStatus;
import com.kami.study.finalProject.repository.AccountRepository;
import com.kami.study.finalProject.repository.CardRepository;
import com.kami.study.finalProject.repository.CreditRepository;
import com.kami.study.finalProject.service.account.credit.CreditAccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;

@Service
@Slf4j
@RequiredArgsConstructor
public class CreditAccountServiceImpl implements CreditAccountService {
    private static final long DAYS_BEFORE_ACCOUNT_DECLINED = 7L;
    private static final Double DEFAULT_PENALTY = 0.01;
    private static final Double MAX_PENALTY = 0.4;

    private final AccountRepository accountRepository;
    private final CreditRepository creditRepository;
    private final CardRepository cardRepository;

    @Override
    public void checkAllCards() {
        for (Card card : cardRepository.findAll()) {
            if (isYearSameAndMonthNext(card)) {
                if (card.getType().equals(CardType.CREDIT)
                        && isCardHaveActiveCredit(card.getNumber())) {
                    return;
                }
                cardRepository.delete(card);
            }
        }
    }


    // todo: create repository method for getting credits with certain date.
    // todo: also change this cycle to stream.
    @Override
    public void checkAllCredits() {
        for (Credit credit : creditRepository.findAll()) {
            if (credit.getDate().compareTo(Date.valueOf(LocalDate.now().plusDays(credit.getDays()))) >= 0
                    && credit.getStatus().equals(CreditStatus.ACTIVE)) {
                credit.setStatus(CreditStatus.OVERDUE);
            }
            if (credit.getStatus().equals(CreditStatus.OVERDUE)
                    && credit.getPenalty() < MAX_PENALTY) {
                credit.setPenalty(credit.getPenalty() + DEFAULT_PENALTY);
            }
            credit.addPenalty();
            creditRepository.save(credit); // todo: test this.
        }
    }

    @Override
    public void checkAllCreditAccount() {
        for (Account account : accountRepository.findAll()) {
            if (account.getStatus().equals(AccountStatus.WAITING)
                    && Date.valueOf(LocalDate.now().minusDays(DAYS_BEFORE_ACCOUNT_DECLINED)).compareTo(account.getLastTransactionDate()) == 0) {
                account.setStatus(AccountStatus.DECLINED);
                accountRepository.save(account);

                // todo: and send email that account was declined.
            }
        }
    }

    private boolean isYearSameAndMonthNext(Card card) {
        return Integer.parseInt(card.getYear()) == LocalDate.now().getYear() && Integer.parseInt(card.getMonth()) < LocalDate.now().getMonthValue();
    }

    private boolean isCardHaveActiveCredit(String cardNumber) {
        return creditRepository.findByAccount_Card_Number(cardNumber)
                .stream()
                .anyMatch(credit -> !credit.getStatus().equals(CreditStatus.CLOSED));
    }
}
