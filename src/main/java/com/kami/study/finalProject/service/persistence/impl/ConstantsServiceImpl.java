package com.kami.study.finalProject.service.persistence.impl;

import com.kami.study.finalProject.model.Constants;
import com.kami.study.finalProject.repository.ConstantsRepository;
import com.kami.study.finalProject.service.persistence.ConstantsService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ConstantsServiceImpl implements ConstantsService {

    private final ConstantsRepository constantsRepository;

    @Override
    public List<Constants> findAll() {
        return constantsRepository.findAll();
    }

    @Override
    public Optional<Constants> findById(Long id) {
        return constantsRepository.findById(id);
    }

    @Override
    public List<Constants> delete(Constants constants) {
        constantsRepository.delete(constants);
        return findAll();
    }

    @Override
    public Constants create(Constants constants) {
        constantsRepository.save(constants);
        return constants;
    }

    @Override
    public Constants update(Constants constants) {
        constantsRepository.save(constants);
        return constants;
    }

    @Override
    public Optional<Constants> findByName(String name) {
        return constantsRepository.findByName(name);
    }
}
