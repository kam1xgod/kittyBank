package com.kami.study.finalProject.mapper;

import com.kami.study.finalProject.DTO.account.AccountRequest;
import com.kami.study.finalProject.DTO.account.AccountResponse;
import com.kami.study.finalProject.exception.InputFieldException;
import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.User;
import com.kami.study.finalProject.model.enums.AccountType;
import com.kami.study.finalProject.model.enums.AccountStatus;
import com.kami.study.finalProject.service.persistence.AccountService;
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

    public List<AccountResponse> findAll() {
        return commonMapper.convertToResponseList(accountService.findAll(), AccountResponse.class);
    }

    public AccountResponse create(AccountRequest accountRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }

        Converter<String, User> getUserByMail = new AbstractConverter<String, User>() {
            @Override
            protected User convert(String mail) {
                return userService.findUserByEmail(mail);
            }
        };

        TypeMap<AccountRequest, Account> propertyMap = commonMapper.createPropertyMapper(AccountRequest.class, Account.class);
        propertyMap.addMappings(mapper -> {
            mapper.using(getUserByMail).map(AccountRequest::getMail, Account::setOwner);
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
}
