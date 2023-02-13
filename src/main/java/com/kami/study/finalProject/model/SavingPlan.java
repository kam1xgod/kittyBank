package com.kami.study.finalProject.model;

import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "savings_plans")
public class SavingPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long years;
    private Double percentage;
    private boolean canWithdraw;
    private boolean canDeposit;
    private boolean closable;
    private boolean capitalized;
    private Long min;
    private Long max;
    private String imageUrl;
}
