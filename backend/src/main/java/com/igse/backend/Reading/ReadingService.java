package com.igse.backend.Reading;

import com.igse.backend.ErrorHandling.AppException;
import com.igse.backend.Utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class ReadingService {
    @Autowired
    ReadingRepo readingRepo;
    @Autowired
    DateUtils dateUtils;

    public void createReading(Reading reading) {
        Reading lastReading = getLastReading(reading.getUserId());
        if(lastReading != null) {
            validateReadings(reading, lastReading);
        }

        readingRepo.createReading(reading);
    }

    public Reading getLastReading(int userId) {
        return readingRepo.getLastReading(userId);
    }

    public void validateReadings(Reading reading, Reading lastReading) {
        LocalDate fromDate = dateUtils.getDate(reading.getDate());
        LocalDate toDate = dateUtils.getDate(lastReading.getDate());

        if (fromDate.compareTo(toDate) < 0) {
            throw new AppException("The entered date is earlier than the last submitted reading's date!");
        }
         else if (reading.getGas() < lastReading.getGas()) {
             throw new AppException("The entered gas reading is lower than the last submitted reading");
        }
        else if (reading.getElectricityDay() < lastReading.getElectricityDay()) {
            throw new AppException("The entered electricity (Day) reading is lower than the last submitted reading");
        }
        else if (reading.getElectricityNight() < lastReading.getElectricityNight()) {
            throw new AppException("The entered electricity (Night) reading is lower than the last submitted reading");
        }
    }
}
