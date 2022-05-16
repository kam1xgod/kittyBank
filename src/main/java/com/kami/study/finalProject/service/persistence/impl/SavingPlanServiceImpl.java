package com.kami.study.finalProject.service.persistence.impl;

import com.kami.study.finalProject.model.SavingPlan;
import com.kami.study.finalProject.repository.SavingPlanRepository;
import com.kami.study.finalProject.service.persistence.SavingPlanService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class SavingPlanServiceImpl implements SavingPlanService {

    private final SavingPlanRepository savingPlanRepository;

    @Override
    public List<SavingPlan> findAll() {
        return savingPlanRepository.findAll();
    }

    @Override
    public Optional<SavingPlan> findById(Long id) {
        return savingPlanRepository.findById(id);
    }

    @Override
    public List<SavingPlan> delete(SavingPlan savingPlan) {
        savingPlanRepository.delete(savingPlan);
        return savingPlanRepository.findAll();
    }

    @Override
    public SavingPlan create(SavingPlan savingPlan) {
        savingPlanRepository.save(savingPlan);
        return savingPlan;
    }

    @Override
    public SavingPlan update(SavingPlan savingPlan) {
        savingPlanRepository.save(savingPlan);
        return savingPlan;
    }
}
