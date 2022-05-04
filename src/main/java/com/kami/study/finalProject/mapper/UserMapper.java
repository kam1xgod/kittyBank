package com.kami.study.finalProject.mapper;

import com.kami.study.finalProject.DTO.user.UserResponse;
import com.kami.study.finalProject.service.persistence.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {
    private final CommonMapper commonMapper;
    private final UserService userService;

    public UserResponse findUserById(Long userId) {
        return commonMapper.convert(userService.findById(userId), UserResponse.class);
    }
}
