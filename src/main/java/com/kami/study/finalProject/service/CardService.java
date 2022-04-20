package com.kami.study.finalProject.service;

import com.kami.study.finalProject.model.card.Card;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public interface CardService extends DefaultService<Card> {
}
