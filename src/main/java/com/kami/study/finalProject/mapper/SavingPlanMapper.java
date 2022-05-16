package com.kami.study.finalProject.mapper;

import com.kami.study.finalProject.DTO.savingPlan.SavingPlanRequest;
import com.kami.study.finalProject.DTO.savingPlan.SavingPlanResponse;
import com.kami.study.finalProject.exception.InputFieldException;
import com.kami.study.finalProject.model.SavingPlan;
import com.kami.study.finalProject.service.persistence.SavingPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.List;

@Component
@RequiredArgsConstructor
public class SavingPlanMapper {

    private final SavingPlanService savingPlanService;
    private final CommonMapper commonMapper;

    public List<SavingPlanResponse> findAll() {
        return commonMapper.convertToResponseList(savingPlanService.findAll(), SavingPlanResponse.class);
    }

    public SavingPlanResponse create(SavingPlanRequest savingPlanRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        SavingPlan savingPlan = commonMapper.convert(savingPlanRequest, SavingPlan.class);
        return commonMapper.convert(savingPlanService.create(savingPlan), SavingPlanResponse.class);
    }

    public SavingPlanResponse update(Long id, SavingPlanRequest savingPlanRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        SavingPlan savingPlan = commonMapper.convert(savingPlanRequest, SavingPlan.class);
        savingPlan.setId(id);
        return commonMapper.convert(savingPlanService.update(savingPlan), SavingPlanResponse.class);
    }

    public SavingPlanResponse findById(Long id) {
        return commonMapper.convert(savingPlanService.findById(id), SavingPlanResponse.class);
    }
}
