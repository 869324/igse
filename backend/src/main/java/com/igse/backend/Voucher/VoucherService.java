package com.igse.backend.Voucher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VoucherService {
    @Autowired
    VoucherRepo voucherRepo;

    public Voucher getByUserId(int userId) {
        return voucherRepo.getByUserId(userId);
    }
    public boolean getIsUsed(int voucherId) {
        return voucherRepo.getIsUsed(voucherId);
    }
}
