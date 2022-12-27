package com.igse.backend.Credit;

import com.igse.backend.ErrorHandling.AppException;
import com.igse.backend.Voucher.Voucher;
import com.igse.backend.Voucher.VoucherService;
import com.igse.backend.user.User;
import com.igse.backend.user.UserRepo;
import com.igse.backend.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CreditService {
    @Autowired
    VoucherService voucherService;
    @Autowired
    UserRepo userRepo;
    public void topUp(User user) {
        Voucher voucher = voucherService.getByCode(user.getVoucher());
        addCredit(user.getId(),  voucher);
    }

    @Transactional
    public void addCredit(int userId, Voucher voucher) {
        try {
            boolean isUsed = voucherService.getIsUsed(voucher.getId());

            if (isUsed){
                throw  new AppException("Voucher already in use!");
            }
            else {
                voucherService.updateOwner(userId, voucher.getId());
                userRepo.addCredit(userId, voucher.getCredit());
            }
        }catch (EmptyResultDataAccessException ex) {
            throw  new AppException("Invalid voucher code");
        }
    }
}
