package com.kami.study.finalProject.DTO.passport;

import com.kami.study.finalProject.DTO.user.UserResponse;
import lombok.Data;

import java.io.Serializable;
import java.sql.Date;

@Data
public class PassportResponse implements Serializable {
    private final Long id;
    private String seriesNumber;
    private Date date;
    private String code;
    private UserResponse user;
}
