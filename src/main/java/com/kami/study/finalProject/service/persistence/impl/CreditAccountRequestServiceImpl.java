package com.kami.study.finalProject.service.persistence.impl;

import com.kami.study.finalProject.model.CreditAccountRequest;
import com.kami.study.finalProject.repository.CreditAccountRequestRepository;
import com.kami.study.finalProject.service.persistence.CreditAccountRequestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class CreditAccountRequestServiceImpl implements CreditAccountRequestService {

    private final CreditAccountRequestRepository requestRepository;

    @Override
    public List<CreditAccountRequest> findAll() {
        return requestRepository.findAll();
    }

    @Override
    public Optional<CreditAccountRequest> findById(Long id) {
        return requestRepository.findById(id);
    }

    @Override
    public List<CreditAccountRequest> delete(CreditAccountRequest request) {
        requestRepository.delete(request);
        return findAll();
    }

    @Override
    public CreditAccountRequest create(CreditAccountRequest request) {
        requestRepository.save(request);
        return request;
    }

    @Override
    public CreditAccountRequest update(CreditAccountRequest request) {
        requestRepository.save(request);
        return request;
    }

    @Override
    public CreditAccountRequest findByUserMail(String mail) {
        return requestRepository.findByUser_Mail(mail);
    }
}
