package com.kami.study.finalProject.service.persistence;

import com.kami.study.finalProject.model.Users;

public interface UserService extends DefaultService<Users> {
    Users findUserByEmail(String mail);
}
