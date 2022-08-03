package com.kami.study.finalProject.mapper;

import com.kami.study.finalProject.DTO.creditAccountRequest.CreditAccountRequestRequest;
import com.kami.study.finalProject.DTO.creditAccountRequest.CreditAccountRequestResponse;
import com.kami.study.finalProject.exception.InputFieldException;
import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.CreditAccountRequest;
import com.kami.study.finalProject.model.User;
import com.kami.study.finalProject.service.persistence.AccountService;
import com.kami.study.finalProject.service.persistence.CreditAccountRequestService;
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
public class CreditAccountRequestMapper {

  private final CommonMapper commonMapper;
  private final CreditAccountRequestService requestService;
  private final AccountService accountService;
  private final UserService userService;

  public List<CreditAccountRequestResponse> findAll() {
    TypeMap<CreditAccountRequest, CreditAccountRequestResponse> propertyMap = commonMapper
        .createPropertyMapper(CreditAccountRequest.class, CreditAccountRequestResponse.class);
    propertyMap.addMappings(mapper -> {
      mapper.map(request -> request.getUser().getMail(), CreditAccountRequestResponse::setMail);
    });

    return commonMapper.convertToResponseList(requestService.findAll(), CreditAccountRequestResponse.class);
  }

  public CreditAccountRequestResponse create(CreditAccountRequestRequest creditAccountRequestRequest,
      BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      throw new InputFieldException(bindingResult);
    }

    Converter<String, User> getUserByMail = new AbstractConverter<String, User>() {
      @Override
      protected User convert(String mail) {
        return userService.findUserByEmail(mail);
      }
    };

    TypeMap<CreditAccountRequestRequest, CreditAccountRequest> propertyMap = commonMapper
        .createPropertyMapper(CreditAccountRequestRequest.class, CreditAccountRequest.class);
    propertyMap.addMappings(mapper -> {
      mapper.using(getUserByMail).map(CreditAccountRequestRequest::getMail, CreditAccountRequest::setUser);
    });
    CreditAccountRequest request = commonMapper.convert(creditAccountRequestRequest, CreditAccountRequest.class);
    return commonMapper.convert(requestService.create(request), CreditAccountRequestResponse.class);
  }

  public List<CreditAccountRequestResponse> delete(String mail) {
    return commonMapper.convertToResponseList(requestService.delete(requestService.findByUserMail(mail)),
        CreditAccountRequestResponse.class);
  }
}
