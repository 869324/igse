package com.igse.backend.Prices;

import lombok.Data;

@Data
public class Prices {
    private int id;
    private float gas;
    private float electricityDay;
    private float electricityNight;
    private float standingCharge;
}
