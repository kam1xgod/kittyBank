package com.kami.study.finalProject.configuration;

import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Card;
import com.kami.study.finalProject.model.Credit;
import com.kami.study.finalProject.model.enums.AccountStatus;
import com.kami.study.finalProject.model.enums.CardType;
import com.kami.study.finalProject.model.enums.CreditStatus;
import com.kami.study.finalProject.service.persistence.AccountService;
import com.kami.study.finalProject.service.persistence.CardService;
import com.kami.study.finalProject.service.persistence.CreditService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.sql.Date;
import java.time.LocalDate;

@Configuration
@EnableScheduling
@RequiredArgsConstructor
public class ScheduledConfiguration {

    private final CreditService creditService;
    private final AccountService accountService;
    private final CardService cardService;

    private static final long DAYS_BEFORE_ACCOUNT_DECLINED = 7L;
    private static final Double DEFAULT_PENALTY = 0.01;
    private static final Double MAX_PENALTY = 0.4;

    // todo: move all methods bodies to service.

    @Scheduled(cron = "0 0 0 * * ?")
    public void checkAllCredits() {
        for (Credit credit : creditService.findAll()) {
            if (credit.getDate().compareTo(Date.valueOf(LocalDate.now().plusDays(credit.getDays()))) >= 0
                    && credit.getStatus().equals(CreditStatus.ACTIVE)) {
                credit.setStatus(CreditStatus.OVERDUE);
            }
            if (credit.getStatus().equals(CreditStatus.OVERDUE)
                    && credit.getPenalty() < MAX_PENALTY) {
                credit.setPenalty(credit.getPenalty() + DEFAULT_PENALTY);
            }
            credit.addPenalty();
            creditService.update(credit); // todo: test this.
        }
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void checkAllAccounts() {
        for (Account account : accountService.findAll()) {
            if (account.getStatus().equals(AccountStatus.WAITING)
                    && Date.valueOf(LocalDate.now().minusDays(DAYS_BEFORE_ACCOUNT_DECLINED)).compareTo(account.getLastTransactionDate()) == 0) {
                account.setStatus(AccountStatus.DECLINED);
                accountService.update(account);

                // todo: and send email that account was declined.
            }
        }
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void checkAllCards() {
        for (Card card : cardService.findAll()) {
            if (isYearSameAndMonthNext(card)) {
                if (card.getType().equals(CardType.CREDIT)
                        && isCardHaveActiveCredit(card.getNumber())) {
                    return;
                }
                cardService.delete(card);
            }
        }
    }

    private boolean isYearSameAndMonthNext(Card card) {
        return Integer.parseInt(card.getYear()) == LocalDate.now().getYear() && Integer.parseInt(card.getMonth()) < LocalDate.now().getMonthValue();
    }

    private boolean isCardHaveActiveCredit(String cardNumber) {
        return accountService.findByCardNumber(cardNumber)
                .getCredits()
                .stream()
                .anyMatch(credit -> !credit.getStatus().equals(CreditStatus.CLOSED));
    }
}
