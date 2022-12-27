package com.igse.backend.Bill;

import com.igse.backend.Reading.Reading;
import com.igse.backend.Reading.ReadingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class BillRepo {
    @Autowired
    ReadingRepo readingRepo;
    public List<Bill> getBills(int userId) {
        List<Reading> readings = readingRepo.getUnpaidReadings(userId);
        List<Bill> bills = new ArrayList<>();

        for (Reading)
    }
}
