package com.igse.backend.Stattistics;

import com.igse.backend.Bill.Bill;
import com.igse.backend.Reading.Reading;
import com.igse.backend.Reading.ReadingService;
import com.igse.backend.Utils.DateUtils;
import com.igse.backend.user.User;
import com.igse.backend.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StatisticsService {
    @Autowired
    ReadingService readingService;
    @Autowired
    UserService userService;
    @Autowired
    DateUtils dateUtils;


    public Statistics getStats() {
        List<User> users = userService.getUsers();

        List<Reading> readings = new ArrayList<>();

        for (User user : users) {
            Reading reading = readingService.getLastBillableReading(user.getId());
            if (reading != null)
                readings.add(reading);
        }

        float sumGas = 0;
        float sumElectricityDay = 0;
        float sumElectricityNight = 0;

        for (Reading reading : readings) {
            Reading previousReading = readingService.getPreviousReading(reading.getUserId(), reading);
            float days = (float) dateUtils.getDaysBetween(reading.getDate(), previousReading.getDate());


            float gas = (reading.getGas() - previousReading.getGas()) / days;
            float electricityDay = (reading.getElectricityDay() - previousReading.getElectricityDay()) / days;
            float electricityNight = (reading.getElectricityNight() - previousReading.getElectricityNight()) / days;

            sumGas += gas;
            sumElectricityDay += electricityDay;
            sumElectricityNight += electricityNight;
        }

        float gasAvg = Float.parseFloat(String.format("%.2f", sumGas / readings.size()));
        float electricityDayAvg = Float.parseFloat(String.format("%.2f", sumElectricityDay / readings.size()));
        float electricityNightAvg = Float.parseFloat(String.format("%.2f", sumElectricityNight / readings.size()));

        Statistics statistics = new Statistics();
        statistics.setGas(gasAvg);
        statistics.setElectricityDay(electricityDayAvg);
        statistics.setElectricityNight(electricityNightAvg);
        return statistics;

    }
}
