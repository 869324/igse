package com.igse.backend.Voucher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoucherService {
    @Autowired
    VoucherRepo voucherRepo;

    public boolean getIsUsed(int voucherId) {
        return voucherRepo.getIsUsed(voucherId);
    }

    public List<Voucher> getByUserId(int userId) {
        return voucherRepo.getByUserId(userId);
    }

    public Voucher getByCode(String code) {
       return voucherRepo.getByCode(code);
    }
    public void updateOwner(int userId, int voucherId) {
        voucherRepo.updateOwner(userId, voucherId);
    }
}
