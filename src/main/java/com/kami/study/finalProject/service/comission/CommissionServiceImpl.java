package com.kami.study.finalProject.service.comission;


import com.kami.study.finalProject.model.enums.CommissionType;
import com.kami.study.finalProject.model.Transfer;
import com.kami.study.finalProject.service.checker.impl.BankCheckerImpl;
import com.kami.study.finalProject.service.checker.Checker;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
public class CommissionServiceImpl implements CommissionService {

    private final Checker checker = new BankCheckerImpl();

    @Override
    public Double calculate(Double amount, CommissionType type) {
        return amount * CommissionType.DEFAULT.getCommissionPercent(); //todo: change this DEFAULT commission to something.
    }

    @Override
    public Double calculate(Transfer transfer) {
        Double commission;
        String recipientCardNumber = transfer.getRecipient().getCard().getNumber();
        if (!Objects.isNull(recipientCardNumber)) {
            CommissionType type = checker.check(recipientCardNumber)
                    ? CommissionType.DEFAULT
                    : CommissionType.ANOTHER_BANK;
            commission = calculate(transfer.getAmount(), type);
        } else {
            commission = CommissionType.DEFAULT.getCommissionPercent();
        }
        transfer.setStatus(transfer.getStatus().next());
        return commission;
    }
}
