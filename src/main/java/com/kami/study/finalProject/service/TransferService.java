package com.kami.study.finalProject.service;

import com.kami.study.finalProject.model.transfer.Transfer;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public interface TransferService extends DefaultService<Transfer> {
}
