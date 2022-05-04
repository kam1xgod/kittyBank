package com.kami.study.finalProject.service.card;

import java.time.LocalDateTime;

public class CardMonthAndYearGenerator {
    public static String generate() {
        LocalDateTime now = LocalDateTime.now();
        String month = String.valueOf(now.getMonthValue());
        if (month.length() < 2) {
            month = "0" + month;
        }
        String year = String.valueOf(now.plusYears(2L).getYear()).substring(2);
        return  month + "/" + year;
    }
}
