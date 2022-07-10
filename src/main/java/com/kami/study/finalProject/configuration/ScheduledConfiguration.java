package com.kami.study.finalProject.configuration;

import com.kami.study.finalProject.service.persistence.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
@RequiredArgsConstructor
public class ScheduledConfiguration {

    private final AccountService accountService;

    @Scheduled(fixedRate = 10 * 60 * 1000)
    public void checkAllCreditAccounts() {
        accountService.checkAllCreditAccounts();
    }
    @Scheduled(fixedRate = 10 * 60 * 1000)
    public void checkAllSavingAccount() {
        accountService.checkAllSavingAccounts();
    }
}
