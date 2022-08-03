package com.kami.study.finalProject.model;

import com.kami.study.finalProject.model.enums.CreditStatus;
import com.kami.study.finalProject.service.exchange.ExchangeService;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.time.chrono.ChronoLocalDate;
import java.time.temporal.ChronoUnit;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "credit")
public class Credit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;

    @Min(value = 1)
    @Max(value = 30)
    private Integer days;

    @Builder.Default
    private Date date = Date.valueOf(LocalDate.now());

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private CreditStatus status = CreditStatus.ACTIVE;

    @Builder.Default
    private Double penalty = 0.0;
    @Builder.Default
    private Double commission = 0.0;
    private Double total;

    @ManyToOne
    private Account account;

    public void setDays() {
        if (Integer.parseInt(getAccount().getCard().getYear()) == LocalDate.now().getYear()) {
            if (Integer.parseInt(getAccount().getCard().getMonth()) == LocalDate.now().getMonthValue()) {
                setDays(LocalDate.now().getMonth().maxLength() - LocalDate.now().getMonthValue());
                return;
            }
        }
        setDays(30);
    }

    public void calculateTotal() {
        setTotal(getAmount() + getAmountWithCommission() + getAmountWithPercentage());
    }

    private Double getAmountWithCommission() {
        return getAmount() * getCommission();
    }

    private Double getAmountWithPercentage() {
        return getAmount() * (getAccount().getPercentage() / 100);
    }

    // todo: move methods below to CreditService.

    public void addPenalty() {
        setTotal(getTotal() + getAmount() * getPenalty());
    }

    public void setCommission() {
        if (account.getCurrency().getName() != "RUB") {
            setCommission(0.1); // todo: some const with default commission;

            try {
                setTotal(getAmount() * ExchangeService.getRate(getAccount().getCurrency()));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public Long getDaysLeft() {
        return ChronoUnit.DAYS.between(LocalDate.now(), getDate().toLocalDate().plusDays(getDays()));
    }
}
