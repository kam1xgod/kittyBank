package com.kami.study.finalProject.DTO.passport;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Date;

@Data
public class PassportRequest {
    @NotBlank(message = "Fill the input field.")
    @Length(max = 11)
    private String seriesNumber;

    @NotNull(message = "Fill the input field.")
    private Date date;

    @NotBlank(message = "Fill the input field.")
    @Length(max = 7)
    private String code;
}
