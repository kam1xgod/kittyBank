package com.kami.study.finalProject.service.comission;

import com.kami.study.finalProject.model.enums.CommissionType;
import com.kami.study.finalProject.model.Transfer;

public interface CommissionService {
    Double calculate(Double amount, CommissionType type);
    Double calculate(Transfer transfer);
}
