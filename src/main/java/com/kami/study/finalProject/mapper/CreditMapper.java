package com.kami.study.finalProject.mapper;

import com.kami.study.finalProject.DTO.credit.CreditRequest;
import com.kami.study.finalProject.DTO.credit.CreditResponse;
import com.kami.study.finalProject.DTO.transfer.TransferRequest;
import com.kami.study.finalProject.exception.InputFieldException;
import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Credit;
import com.kami.study.finalProject.model.Transfer;
import com.kami.study.finalProject.service.persistence.AccountService;
import com.kami.study.finalProject.service.persistence.CreditService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.TypeMap;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CreditMapper {

    private final CommonMapper commonMapper;
    private final CreditService creditService;
    private final AccountService accountService;

    public List<CreditResponse> findAll() {
        propertyDaysLeft();
        return commonMapper.convertToResponseList(creditService.findAll(), CreditResponse.class);
    }

    public CreditResponse findById(Long id) {
        propertyDaysLeft();
        return commonMapper.convert(creditService.findById(id), CreditResponse.class);
    }

    public CreditResponse create(CreditRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }

        Converter<String, Account> getAccountByNumber = new AbstractConverter<String, Account>() {
            @Override
            protected Account convert(String number) {
                return accountService.findByAccountNumber(number);
            }
        };

        TypeMap<CreditRequest, Credit> propertyMap = commonMapper.createPropertyMapper(CreditRequest.class, Credit.class);
        propertyMap.addMappings(mapper -> {
            mapper.using(getAccountByNumber).map(CreditRequest::getAccountNumber, Credit::setAccount);
        });

        Credit credit = commonMapper.convert(request, Credit.class);
        return commonMapper.convert(creditService.create(credit), CreditResponse.class);
    }

    public List<CreditResponse> getCreditsByMail(String mail) {
        propertyDaysLeft();
        return commonMapper.convertToResponseList(creditService.findByUserMail(mail), CreditResponse.class);
    }

    public List<CreditResponse> getCreditsByAccountId(Long id) {
        propertyDaysLeft();
        return commonMapper.convertToResponseList(creditService.findByAccountId(id), CreditResponse.class);
    }

  public List<CreditResponse> payCredit(String mail, Long id) {
      propertyDaysLeft();
    return commonMapper.convertToResponseList(creditService.payOrClose(mail, id), CreditResponse.class);
  }

    private void propertyDaysLeft() {
        TypeMap<Credit, CreditResponse> propertyMap = commonMapper.createPropertyMapper(Credit.class, CreditResponse.class);
        propertyMap.addMappings(mapper -> {
            mapper.map(Credit::getDaysLeft, CreditResponse::setDaysLeft);
        });
    }
}
