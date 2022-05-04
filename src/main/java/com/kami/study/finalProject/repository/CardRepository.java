package com.kami.study.finalProject.repository;

import com.kami.study.finalProject.model.Card;
import com.kami.study.finalProject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
    Optional<Card> findByNumber(String number);
    @Query("select c from Card c join Account a on a.card.id = c.id where a.id = ?1")
    Optional<Card> findByAccountId(Long accountId);
}
