package com.kami.study.finalProject.service.persistence.impl;

import com.kami.study.finalProject.model.Card;
import com.kami.study.finalProject.repository.CardRepository;
import com.kami.study.finalProject.service.persistence.CardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {

    private final CardRepository cardRepository;

    @Override
    public List<Card> findAll() {
        return cardRepository.findAll();
    }

    @Override
    public Optional<Card> findById(Long id) {
        return cardRepository.findById(id);
    }

    @Override
    public List<Card> delete(Card card) {
        cardRepository.delete(card);
        return findAll();
    }

    @Override
    public Card create(Card card) {
        cardRepository.save(card);
        return card;
    }

    @Override
    public Card update(Card card) {
        cardRepository.save(card);
        return card;
    }
}
