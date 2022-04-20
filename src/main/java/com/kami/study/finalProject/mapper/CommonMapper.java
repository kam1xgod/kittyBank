package com.kami.study.finalProject.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CommonMapper {

    private final ModelMapper modelMapper;

    public CommonMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    <T, S> S convert(T data, Class<S> type) {
        return modelMapper.map(data, type);
    }

    <T, S> List<S> convertToResponseList(List<T> tList, Class<S> type) {
        return tList.stream()
                .map(list -> convert(list, type))
                .collect(Collectors.toList());
    }
}
