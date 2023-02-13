package com.kami.study.finalProject.mapper;

import com.kami.study.finalProject.DTO.account.AccountRequest;
import com.kami.study.finalProject.DTO.account.AccountResponse;
import com.kami.study.finalProject.exception.InputFieldException;
import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Currency;
import com.kami.study.finalProject.model.Users;
import com.kami.study.finalProject.model.enums.AccountType;
import com.kami.study.finalProject.model.enums.AccountStatus;
import com.kami.study.finalProject.service.persistence.AccountService;
import com.kami.study.finalProject.service.persistence.CurrencyService;
import com.kami.study.finalProject.service.persistence.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.TypeMap;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.List;

@Component
@RequiredArgsConstructor
public class AccountMapper {
    private final CommonMapper commonMapper;
    private final AccountService accountService;
    private final UserService userService;
    private final CurrencyService currencyService;

    public List<AccountResponse> findAll() {
        return commonMapper.convertToResponseList(accountService.findAll(), AccountResponse.class);
    }

    public AccountResponse create(AccountRequest accountRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }

        Converter<String, Users> getUserByMail = new AbstractConverter<String, Users>() {
            @Override
            protected Users convert(String mail) {
                return userService.findUserByEmail(mail);
            }
        };

        Converter<String, Currency> getCurrencyByName = new AbstractConverter<String, Currency>() {
            @Override
            protected Currency convert(String name) {
                return currencyService.findByName(name);
            }
        };

        TypeMap<AccountRequest, Account> propertyMap = commonMapper.createPropertyMapper(AccountRequest.class, Account.class);
        propertyMap.addMappings(mapper -> {
            mapper.using(getUserByMail).map(AccountRequest::getMail, Account::setOwner);
            mapper.using(getCurrencyByName).map(AccountRequest::getCurrencyName, Account::setCurrency);
        });

        Account account = commonMapper.convert(accountRequest, Account.class);
        return commonMapper.convert(accountService.create(account, accountRequest.getPaymentSystem()), AccountResponse.class);
    }

    public List<AccountResponse> findByUserMail(String mail) {
        return commonMapper.convertToResponseList(accountService.findByUserMail(mail), AccountResponse.class);
    }

    public List<AccountResponse> findByUserId(Long id) {
        return commonMapper.convertToResponseList(accountService.findByUserId(id), AccountResponse.class);
    }

    public AccountResponse findById(Long id) {
        return commonMapper.convert(accountService.findById(id), AccountResponse.class);
    }

    public String activateAccount(String code) {
        return accountService.activateAccount(code);
    }

    public List<AccountResponse> findAllCreditAccounts(String mail) {
        return commonMapper.convertToResponseList(accountService.findByOwnerMailAndType(mail, AccountType.CREDIT), AccountResponse.class);
    }

    public List<AccountResponse> findAllActiveCreditAccounts(String mail) {
        return commonMapper.convertToResponseList(accountService.findByOwnerMailAndTypeAndStatus(mail, AccountType.CREDIT, AccountStatus.ACTIVE), AccountResponse.class);
    }

    public List<AccountResponse> findAllActiveCardAccounts(String mail) {
        return commonMapper.convertToResponseList(accountService.findByOwnerMailAndTypeAndStatus(mail, AccountType.CARD, AccountStatus.ACTIVE), AccountResponse.class);
    }

  public String delete(Long userId, Long accountId) {
      return accountService.delete(userId, accountId);
  }
}
