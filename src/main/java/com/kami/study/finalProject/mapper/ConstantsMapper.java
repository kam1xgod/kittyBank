package com.kami.study.finalProject.mapper;

import com.kami.study.finalProject.DTO.constants.*;
import com.kami.study.finalProject.exception.InputFieldException;
import com.kami.study.finalProject.model.Constants;
import com.kami.study.finalProject.service.persistence.ConstantsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ConstantsMapper {

    private final CommonMapper commonMapper;
    private final ConstantsService constantsService;

    public List<ConstantsResponse> findAll() {
        return commonMapper.convertToResponseList(constantsService.findAll(), ConstantsResponse.class);
    }

    public ConstantsResponse create(ConstantsRequest constantsRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        Constants constants = commonMapper.convert(constantsRequest, Constants.class);
        return commonMapper.convert(constantsService.create(constants), ConstantsResponse.class);
    }

    public ConstantsResponse findById(Long id) {
        return commonMapper.convert(constantsService.findById(id), ConstantsResponse.class);
    }
  
    public ConstantsResponse findByName(String name) {
        return commonMapper.convert(constantsService.findByName(name), ConstantsResponse.class);
    }
}
