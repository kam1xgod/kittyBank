package com.kami.study.finalProject.mapper;

import com.kami.study.finalProject.DTO.user.UserResponse;
import com.kami.study.finalProject.service.UserService;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    private final CommonMapper commonMapper;
    private final UserService userService;

    public UserMapper(CommonMapper commonMapper, UserService userService) {
        this.commonMapper = commonMapper;
        this.userService = userService;
    }

    public UserResponse findUserById(Long userId) {
        return commonMapper.convert(userService.findById(userId), UserResponse.class);
    }
}
