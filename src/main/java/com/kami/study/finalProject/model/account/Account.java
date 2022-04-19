package com.kami.study.finalProject.model.account;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity(name = "account")
public class Account {
    // Basically, account is everything.
    // But. When person agreed with creating a card for this account - it becomes card account.
    // So, in DB I can easily create col. where I would point - is this account have its own card or not.

    // number - 20 digits.
    // card - from 13 to 19 digits. will take from 13 to 16 digits.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
