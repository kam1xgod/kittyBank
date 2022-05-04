package com.kami.study.finalProject.model;

import com.kami.study.finalProject.model.enums.AccountStatus;
import com.kami.study.finalProject.model.enums.AccountType;
import com.kami.study.finalProject.model.enums.Currency;
import com.kami.study.finalProject.service.account.AccountNumberGenerator;
import lombok.*;
import org.hibernate.validator.constraints.Length;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "account")
public class Account {
    // number - 20 digits.
    // card - from 13 to 19 digits. will take from 13 to 16 digits.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Length(min = 20, max = 20)
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
    private AccountType type;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Currency currency = Currency.RUB;

    private Double creditLimit;

    @OneToOne
    @Nullable
    private Card card;

    @ManyToOne
    @JoinColumn(name = "owner")
    private User owner;

    @OneToMany
    @JoinTable(name = "account_credit", joinColumns = @JoinColumn(name = "account_id"))
    private List<Credit> credits;

    public void addMoney(Double amount) {
        this.balance += amount;
        setLastTransactionDate(Date.valueOf(LocalDate.now()));
    }

    public void withdrawMoney(Double amount) {
        this.balance -= amount;
        setLastTransactionDate(Date.valueOf(LocalDate.now()));
    }
}
