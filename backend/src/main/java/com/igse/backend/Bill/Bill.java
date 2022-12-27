package com.igse.backend.Bill;

import lombok.Data;

@Data
public class Bill {
    private String fromDate;
    private String toDate;
    private float gas;
    private float electricityDay;
    private float electricityNight;
    private float standingCharge;
    private float total;
}
