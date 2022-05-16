package com.kami.study.finalProject.configuration;

import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Card;
import com.kami.study.finalProject.model.Credit;
import com.kami.study.finalProject.model.enums.AccountStatus;
import com.kami.study.finalProject.model.enums.CardType;
import com.kami.study.finalProject.model.enums.CreditStatus;
import com.kami.study.finalProject.service.account.credit.CreditAccountService;
import com.kami.study.finalProject.service.account.saving.SavingAccountService;
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

    private final AccountService accountService;

    @Scheduled(cron = "0 0 0 * * ?")
    public void checkAllCreditAccounts() {
        accountService.checkAllCreditAccounts();
    }
    @Scheduled(cron = "0 0 0 * * ?")
    public void checkAllSavingAccount() {
        accountService.checkAllSavingAccounts();
    }
}
