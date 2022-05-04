package com.kami.study.finalProject.service.persistence;

import com.kami.study.finalProject.model.User;

public interface UserService extends DefaultService<User> {
    User findUserByEmail(String mail);
}
