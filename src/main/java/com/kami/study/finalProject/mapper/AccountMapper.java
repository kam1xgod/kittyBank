package com.kami.study.finalProject.mapper;

import com.kami.study.finalProject.DTO.account.AccountRequest;
import com.kami.study.finalProject.DTO.account.AccountResponse;
import com.kami.study.finalProject.exception.InputFieldException;
import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.User;
import com.kami.study.finalProject.service.persistence.AccountService;
import com.kami.study.finalProject.service.persistence.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.TypeMap;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

@Component
@RequiredArgsConstructor
public class AccountMapper {
    private final CommonMapper commonMapper;
    private final AccountService accountService;
    private final UserService userService;

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
}