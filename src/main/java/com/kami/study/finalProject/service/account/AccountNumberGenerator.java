package com.kami.study.finalProject.service.account;

import java.util.Random;
import java.util.stream.Collectors;

public class AccountNumberGenerator {

    private static final int ACCOUNT_NUMBER_SIZE = 20;
    private static final int LOWEST_NUMBER = 0;
    private static final int HIGHEST_NUMBER = 10;

    public static String generate() {
        return new Random().ints(ACCOUNT_NUMBER_SIZE, LOWEST_NUMBER, HIGHEST_NUMBER)
                .mapToObj(String::valueOf)
                .collect(Collectors.joining());
    }
}
