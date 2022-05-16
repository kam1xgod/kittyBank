package com.kami.study.finalProject.repository;

import com.kami.study.finalProject.model.Account;
import com.kami.study.finalProject.model.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface TransferRepository extends JpaRepository<Transfer, Long> {
//    @Query("select t from Transfer t join Account a on a = t or a.id = t.recipient.id where a.id = ?1")
//    List<Transfer> getTransfersByAccountId(Long accountId);
    // todo: think about it. It should be.


    List<Transfer> getTransfersBySender(Account sender);

    List<Transfer> getTransfersByRecipient(Account recipient);

    @Query("select t from Transfer t where t.recipient.id = ?1 or t.sender.id = ?1")
    List<Transfer> getTransfersByAccountId(Long accountId);

    List<Transfer> getBySender_Id(Long id);

    List<Transfer> getByRecipient_Id(Long id);

    List<Transfer> getBySender_Owner_Mail(String mail);

    List<Transfer> getByRecipient_Owner_Mail(String mail);

    List<Transfer> getBySender_Owner_Id(Long id);

    List<Transfer> getByRecipient_Owner_Id(Long id);
}
