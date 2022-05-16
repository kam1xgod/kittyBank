package com.kami.study.finalProject.model;

import com.kami.study.finalProject.model.enums.AccountStatus;
import com.kami.study.finalProject.model.enums.AccountType;
import com.kami.study.finalProject.model.enums.Currency;
import com.kami.study.finalProject.service.account.AccountNumberGenerator;
import com.kami.study.finalProject.service.card.CardNumberGenerator;
import com.kami.study.finalProject.service.exchange.ExchangeService;
import lombok.*;
import org.hibernate.validator.constraints.Length;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "account")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Length(min = 19, max = 20)
    @Builder.Default
    private String number = AccountNumberGenerator.generate();

    @Builder.Default
    private Date lastTransactionDate = Date.valueOf(LocalDate.now());

    @Builder.Default
    private Double balance = 0.0;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private AccountStatus status = AccountStatus.WAITING;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private AccountType type = AccountType.CARD;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Currency currency = Currency.RUB;

    @Nullable
    private Double creditLimit;

    @OneToOne
    @Nullable
    private Card card;

    @ManyToOne
    @JoinColumn(name = "owner")
    private User owner;

    @Nullable
    @Builder.Default
    private Double percentage = null;

    @Builder.Default
    private boolean canWithdraw = false;

    @Builder.Default
    private boolean canDeposit = false;

    @Builder.Default
    private boolean closable = false;

    @Builder.Default
    private boolean capitalized = false;

    @Nullable
    @Builder.Default
    private Double min = 100_000.0;

    @Nullable
    @Builder.Default
    private Double max = 1_000_000.0;

    @Nullable
    @Builder.Default
    private Double minMonth = 0.0;

    @Nullable
    @Builder.Default
    private Long years = 0L;

    @Builder.Default
    private Date dateOpened = Date.valueOf(LocalDate.now());

    @Nullable
    private String activationCode;

    public void addMoney(Double amount) {
        this.balance += amount;
        setLastTransactionDate(Date.valueOf(LocalDate.now()));
    }

    public void withdrawMoney(Double amount) {
        this.balance -= amount;
        setLastTransactionDate(Date.valueOf(LocalDate.now()));
    }

    public double getExchangedBalance() {
        try {
            return getBalance() * ExchangeService.getRate(getCurrency());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
