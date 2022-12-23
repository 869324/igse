package com.igse.backend.Voucher;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Optional;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Voucher {
    private int id;
    private String code;
    private Optional<Integer> userId;
    private float credit;
}
