package com.igse.backend.Utils;

import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class DateUtils {
    DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public LocalDate getDate(String dateString) {
        return LocalDate.parse(dateString, format);
    }

    public int getDaysBetween(LocalDate date1, LocalDate date2) {
        return (int) Duration.between(date1, date2).toDays();
    }
}
