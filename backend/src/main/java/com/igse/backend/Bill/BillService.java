package com.igse.backend.Bill;

import com.igse.backend.ErrorHandling.AppException;
import com.igse.backend.Prices.Prices;
import com.igse.backend.Prices.PricesService;
import com.igse.backend.Reading.Reading;
import com.igse.backend.Reading.ReadingService;
import com.igse.backend.Utils.DateUtils;
import com.igse.backend.user.User;
import com.igse.backend.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class BillService {
    @Autowired
    BillRepo billRepo;
    @Autowired
    ReadingService readingService;
    @Autowired
    PricesService pricesService;
    @Autowired
    DateUtils dateUtils;
    @Autowired
    UserService userService;

    public List<Bill> getBills(int userId) {
        Prices prices = pricesService.getPrices();
        List<Reading> readings = readingService.getUnpaidReadings(userId);
        List<Bill> bills = new ArrayList<>();

        for (Reading reading: readings) {
            Bill bill = new Bill();

            Reading previousReading = readingService.getPreviousReading(userId, reading);
            if (previousReading != null) {
                bill.setUserId(userId);
                bill.setToDate(reading.getDate());
                bill.setFromDate(previousReading.getDate());
                bill.setGas((reading.getGas() - previousReading.getGas()) * prices.getGas());
                bill.setElectricityDay((reading.getElectricityDay() - previousReading.getElectricityDay()) * prices.getElectricityDay());
                bill.setElectricityNight((reading.getElectricityNight() - previousReading.getElectricityNight()) * prices.getElectricityNight());
                bill.setStandingCharge(dateUtils.getDaysBetween(reading.getDate(), previousReading.getDate()) * prices.getStandingCharge());
                bill.setTotal(bill.getGas() + bill.getElectricityDay() + bill.getElectricityNight() + bill.getStandingCharge());

                bills.add(bill);
            }

        }

        return bills;
    }

    @Transactional
    public void payBill(Bill bill) {

        Reading reading = readingService.getByDate(bill.getUserId(), bill.getToDate());
        User user = userService.getById(bill.getUserId());

        if (user.getCredit() < bill.getTotal()) {
            throw new AppException("You do not have enough credit to make thi payment!");
        } else {
            
        }
    }
}
