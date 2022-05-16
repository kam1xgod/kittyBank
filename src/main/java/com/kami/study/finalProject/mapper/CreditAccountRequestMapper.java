package com.kami.study.finalProject.mapper;

import com.kami.study.finalProject.DTO.creditAccountRequest.CreditAccountRequestResponse;
import com.kami.study.finalProject.model.CreditAccountRequest;
import com.kami.study.finalProject.model.User;
import com.kami.study.finalProject.service.persistence.CreditAccountRequestService;
import com.kami.study.finalProject.service.persistence.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.TypeMap;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CreditAccountRequestMapper {

    private final CommonMapper commonMapper;
    private final CreditAccountRequestService requestService;
    private final UserService userService;

    public List<CreditAccountRequestResponse> findAll() {
        TypeMap<CreditAccountRequest, CreditAccountRequestResponse> propertyMap = commonMapper.createPropertyMapper(CreditAccountRequest.class, CreditAccountRequestResponse.class);
        propertyMap.addMappings(mapper -> {
            mapper.map(request -> request.getUser().getMail(), CreditAccountRequestResponse::setMail);
        });

        return commonMapper.convertToResponseList(requestService.findAll(), CreditAccountRequestResponse.class);
    }

    public CreditAccountRequestResponse create(String mail) {
        CreditAccountRequest creditAccountRequest = new CreditAccountRequest();
        creditAccountRequest.setUser(userService.findUserByEmail(mail));
        return commonMapper.convert(requestService.create(creditAccountRequest), CreditAccountRequestResponse.class);
    }

    public List<CreditAccountRequestResponse> delete(String mail) {
        return commonMapper.convertToResponseList(requestService.delete(requestService.findByUserMail(mail)), CreditAccountRequestResponse.class);
    }
}
