package com.kami.study.finalProject.model;

import com.kami.study.finalProject.model.enums.TransferStatus;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "transfer")
public class Transfer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Builder.Default
    private LocalDateTime dateTime = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "sender_account_id")
    private Account sender;

    @ManyToOne
    @JoinColumn(name = "recipient_account_id")
    private Account recipient;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private TransferStatus status = TransferStatus.NEW;

    private Double commission;

    private Double amount;

    public void deny() {
        this.status = TransferStatus.DENIED;
    }
}
