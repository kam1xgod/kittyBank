package com.kami.study.finalProject.configuration;

import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Credit;
import com.kami.study.finalProject.model.enums.AccountStatus;
import com.kami.study.finalProject.model.enums.CreditStatus;
import com.kami.study.finalProject.service.persistence.AccountService;
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

    private static final long DAYS_BEFORE_ACCOUNT_DECLINED = 7L;

    @Scheduled(cron = "0 0 0 * * ?")
    public void checkAllCredits() {
        for (Credit credit : creditService.findAll()) {
            if (credit.getDate().compareTo(Date.valueOf(LocalDate.now().plusDays(credit.getDays()))) >= 0
                    && credit.getStatus().equals(CreditStatus.ACTIVE)) {
                credit.setStatus(CreditStatus.OVERDUE);
                credit.setAmount(credit.getAmount() + credit.getAmount() * credit.getPenalty()); // todo: test this.
                creditService.update(credit);
            }
            if (credit.getStatus().equals(CreditStatus.OVERDUE) && credit.getPenalty() < credit.getPenalty() * 0.4) {
                credit.setPenalty(credit.getPenalty() + 0.01);
                credit.setAmount(credit.getAmount() + credit.getAmount() * credit.getPenalty());
                creditService.update(credit);
            }
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
}
