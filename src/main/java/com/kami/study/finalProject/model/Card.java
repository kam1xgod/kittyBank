package com.kami.study.finalProject.model;

import com.kami.study.finalProject.model.enums.CardType;
import lombok.*;
import org.hibernate.validator.constraints.Length;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@AllArgsConstructor
@NoArgsConstructor
@Builder(setterPrefix = "with")
@Getter
@Setter
@Entity
@Table(name = "card")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String number;

    private String month_year;

    private String cvv;

    @Enumerated(EnumType.STRING)
    private CardType type;

    // todo: method that returns month and year as string or int.
    // todo: use substring for it.
}
