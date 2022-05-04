package com.kami.study.finalProject.model;

import com.kami.study.finalProject.model.enums.CreditStatus;
import com.kami.study.finalProject.model.enums.Currency;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "credit")
public class Credit {
    @Id
    @GeneratedValue
    private Long id;

    private Double amount;

    @Min(value = 1)
    @Max(value = 30)
    private Integer days;

    private Date date;

    @Enumerated(EnumType.STRING)
    private Currency currency;

    @Enumerated(EnumType.STRING)
    private CreditStatus status;

    private Double penalty;
    private Double percentage;

    @ManyToOne
    private Account account;
}
