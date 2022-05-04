package com.kami.study.finalProject.mapper;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CommonMapper {

    private final ModelMapper modelMapper;
    <T, S> S convert(T data, Class<S> type) {
        return modelMapper.map(data, type);
    }

    <T, S> List<S> convertToResponseList(List<T> tList, Class<S> type) {
        return tList.stream()
                .map(list -> convert(list, type))
                .collect(Collectors.toList());
    }

    <T, S> TypeMap<T, S> createPropertyMapper(Class<T> from, Class<S> to) {
        return this.modelMapper.typeMap(from, to);
    }
}
