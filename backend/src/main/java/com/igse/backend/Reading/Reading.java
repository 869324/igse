package com.igse.backend.Reading;

import lombok.Data;

@Data
public class Reading {
    private int id;
    private int userId;
    private String date;
    private int gas;
    private int electricityDay;
    private int electricityNight;
}
