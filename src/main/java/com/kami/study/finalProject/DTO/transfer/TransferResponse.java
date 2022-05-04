package com.kami.study.finalProject.DTO.transfer;

import com.kami.study.finalProject.model.enums.TransferStatus;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class TransferResponse implements Serializable {
    private Long id;
    private LocalDateTime dateTime;
    private TransferStatus status;
    private Double commission;
    private Double amount;
    private String senderNumber;
    private String recipientNumber;
}
