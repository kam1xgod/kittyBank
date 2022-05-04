package com.kami.study.finalProject.mapper;

import com.kami.study.finalProject.DTO.transfer.TransferRequest;
import com.kami.study.finalProject.DTO.transfer.TransferResponse;
import com.kami.study.finalProject.exception.InputFieldException;
import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Transfer;
import com.kami.study.finalProject.model.User;
import com.kami.study.finalProject.repository.AccountRepository;
import com.kami.study.finalProject.service.persistence.AccountService;
import com.kami.study.finalProject.service.persistence.TransferService;
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
public class TransferMapper {

    private final CommonMapper commonMapper;
    private final TransferService transferService;
    private final AccountService accountService;

    public List<TransferResponse> findAll() {
        return commonMapper.convertToResponseList(transferService.findAll(), TransferResponse.class);
    }

    public TransferResponse findTransferById(Long transferId) {
        TypeMap<Transfer, TransferResponse> propertyMap = commonMapper.createPropertyMapper(Transfer.class, TransferResponse.class);
        propertyMap.addMappings(mapper -> {
            mapper.map(transfer -> transfer.getSender().getNumber(), TransferResponse::setSenderNumber);
            mapper.map(transfer -> transfer.getRecipient().getNumber(), TransferResponse::setRecipientNumber);
        });
        return commonMapper.convert(transferService.findById(transferId), TransferResponse.class);
    }

    public List<TransferResponse> create(TransferRequest transferRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        Converter<String, Account> getAccountByNumber = new AbstractConverter<String, Account>() {
            @Override
            protected Account convert(String number) {
                return accountService.findByAccountNumber(number);
            }
        };
        TypeMap<TransferRequest, Transfer> propertyMap = commonMapper.createPropertyMapper(TransferRequest.class, Transfer.class);
        propertyMap.addMappings(mapper -> {
            mapper.using(getAccountByNumber).map(TransferRequest::getSenderNumber, Transfer::setSender);
            mapper.using(getAccountByNumber).map(TransferRequest::getRecipientNumber, Transfer::setRecipient);
        });
        Transfer transfer = commonMapper.convert(transferRequest, Transfer.class);
        return commonMapper.convertToResponseList(transferService.commitTransfer(transfer), TransferResponse.class);
    }

    // todo: ещё одна гениальная идея, которую ты никогда не реализуешь. отправлять на почту сообщение с ссылкой для подтверждения перевода.
}
