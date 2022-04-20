package com.kami.study.finalProject.service;

import com.kami.study.finalProject.model.account.Account;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public interface AccountService extends DefaultService<Account> {
}
