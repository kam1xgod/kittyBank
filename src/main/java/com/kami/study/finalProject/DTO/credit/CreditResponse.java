package com.kami.study.finalProject.DTO.credit;

import com.kami.study.finalProject.model.enums.CreditStatus;
import lombok.Data;

import java.sql.Date;

@Data
public class CreditResponse {
    private Long id;
    private Double total;
    private Date date;
    private CreditStatus status;
    private Long daysLeft;
    private Long penalty;
}
