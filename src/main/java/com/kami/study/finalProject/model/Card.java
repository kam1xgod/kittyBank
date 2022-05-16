package com.kami.study.finalProject.model;

import com.kami.study.finalProject.model.enums.CardType;
import lombok.*;

import javax.persistence.*;

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

    private String monthYear;

    private String cvv;

    @Enumerated(EnumType.STRING)
    private CardType type;

    public String getMonth() {
        return this.monthYear.substring(0, 2);
    }

    public String getYear() {
        return this.monthYear.substring(3);
    }
}
