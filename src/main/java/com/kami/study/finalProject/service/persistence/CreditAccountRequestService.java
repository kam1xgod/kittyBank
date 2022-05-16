package com.kami.study.finalProject.service.persistence;

import com.kami.study.finalProject.model.CreditAccountRequest;

import java.util.List;

public interface CreditAccountRequestService extends DefaultService<CreditAccountRequest> {
    CreditAccountRequest findByUserMail(String mail);
}
