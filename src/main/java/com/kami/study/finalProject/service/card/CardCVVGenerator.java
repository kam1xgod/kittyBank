package com.kami.study.finalProject.service.card;

import java.util.Random;
import java.util.stream.Collectors;

public class CardCVVGenerator {
    public static String generate() {
        return new Random()
                .ints(3, 0, 10)
                .mapToObj(String::valueOf)
                .collect(Collectors.joining());
    }
}
