package com.kami.study.finalProject.service.persistence.impl;

import com.kami.study.finalProject.exception.ApiRequestException;
import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Credit;
import com.kami.study.finalProject.model.enums.AccountStatus;
import com.kami.study.finalProject.model.enums.AccountType;
import com.kami.study.finalProject.model.enums.CreditStatus;
import com.kami.study.finalProject.repository.CreditRepository;
import com.kami.study.finalProject.repository.UserRepository;
import com.kami.study.finalProject.service.checker.impl.CreditChecker;
import com.kami.study.finalProject.service.persistence.CreditService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
public class CreditServiceImpl implements CreditService {

  private final CreditRepository creditRepository;
  private final CreditChecker creditChecker;
  private final UserRepository userRepository;

  @Override
  public List<Credit> findAll() {
    return creditRepository.findAll();
  }

  @Override
  public Optional<Credit> findById(Long id) {
    return creditRepository.findById(id);
  }

  @Override
  public List<Credit> delete(Credit credit) {
    creditRepository.delete(credit);
    return findAll();
  }

  @Override
  public Credit create(Credit credit) {
    creditChecker.check(credit);

    credit.setCommission();
    credit.setDays();
    credit.calculateTotal();
    credit.getAccount().setBalance(credit.getAccount().getBalance() + credit.getAmount());
    creditRepository.save(credit);
    return credit;
  }

  @Override
  public Credit update(Credit credit) {
    creditRepository.save(credit);
    return credit;
  }

  @Override
  public List<Credit> findByAccountId(Long id) {
    return creditRepository.findByAccount_Id(id);
  }

  @Override
  public List<Credit> findByAccountNumber(String number) {
    return creditRepository.findByAccount_Number(number);
  }

  @Override
  public List<Credit> findByUserMail(String mail) {
    return creditRepository.findByAccount_Owner_Mail(mail);
  }

  @Override
  public List<Credit> findByCardNumber(String number) {
    return creditRepository.findByAccount_Card_Number(number);
  }

  // todo: idk if it's ok to keep this methods here. will stick with it for now.
  public List<Credit> payOrClose(String mail, Long id) {
    Credit credit = findById(id)
        .orElseThrow(() -> new ApiRequestException("There's no credit with such a number", HttpStatus.BAD_REQUEST));
    if (credit.getAccount().getOwner().equals(userRepository.findByMail(mail))) {
      double exchanged = credit.getAccount().getExchangedBalance();
      if (exchanged > credit.getTotal()) {
        exchanged = credit.getTotal();
      }
      pay(exchanged, credit);
      return findAll();
    } else {
      throw new ApiRequestException("This credit doesn't belong to your account", HttpStatus.BAD_REQUEST);
    }
  }

  private void pay(Double sum, Credit credit) {
    credit.setTotal(credit.getTotal() - sum);
    credit.getAccount().withdrawMoney(sum);
    if (credit.getTotal() == 0.0) {
      credit.setStatus(CreditStatus.CLOSED);
    }
  }
}
