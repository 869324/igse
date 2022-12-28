package com.igse.backend.Utils;

import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Duration;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;

@Service
public class DateUtils {
    DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public LocalDate getDate(String dateString) {
        return LocalDate.parse(dateString, format);
    }

    public int getDaysBetween(String date1, String date2) {
        return getDaysBetween(getDate(date1), getDate(date2));
    }

    public int getDaysBetween(LocalDate date1, LocalDate date2) {
        return Math.abs(Period.between(date1, date2).getDays());
    }
}
