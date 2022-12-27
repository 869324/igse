package com.igse.backend.Bill;

import com.igse.backend.Reading.Reading;
import com.igse.backend.Reading.ReadingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BillService {
    @Autowired
    BillRepo billRepo;
    @Autowired
    ReadingService readingService;

    public List<Bill> getBills(int userId) {
        List<Reading> readings = readingService.getUnpaidReadings(userId);
        List<Bill> bills = new ArrayList<>();

        for (Reading reading: readings) {

        }

        return bills;
    }
}
