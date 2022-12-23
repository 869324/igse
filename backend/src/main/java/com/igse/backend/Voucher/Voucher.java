package com.igse.backend.Voucher;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Voucher {
    private int id;
    private String code;
    private int userId;
    private float credit;
}
