package com.kami.study.finalProject.DTO.constants;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ConstantsRequest {
    @NotBlank(message = "Fill the input field.")
    private String name;

    @NotBlank(message = "Fill the input field.")
    private Double value;

    @NotBlank(message = "Fill the input field.")
    private String shownName;
}
