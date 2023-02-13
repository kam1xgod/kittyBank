package com.kami.study.finalProject.service.persistence;

import java.util.Optional;

import com.kami.study.finalProject.model.Constants;

public interface ConstantsService extends DefaultService<Constants> {
    Optional<Constants> findByName(String name);
}
