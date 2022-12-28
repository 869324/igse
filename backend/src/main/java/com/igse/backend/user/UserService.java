package com.igse.backend.user;

import com.igse.backend.Auth.AuthManager;
import com.igse.backend.Credit.CreditService;
import com.igse.backend.ErrorHandling.AppException;
import com.igse.backend.Utils.JwtUtil;
import com.igse.backend.Voucher.Voucher;
import com.igse.backend.Voucher.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class UserService {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private AuthManager authManager;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    VoucherService voucherService;
    @Autowired
    CreditService creditService;


@Transactional
    public User signup(User user) throws Exception {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User createdUser = userRepo.createUser(user);
            creditService.topUp(user);
            return createdUser;
        } catch (Exception ex) {
            throw ex;
        }
    }

    public User getUserData(String token) {
        User user = userRepo.findByEmail(jwtUtil.extractUsername(token));
        user.setPassword(null);
        return user;
    }


   public void addCredit(int userId, float credit) {
       userRepo.addCredit(userId, credit);
   }

   public User getById(int userId) {
    return userRepo.getById(userId);
   }

    public void updateCredit(int userId, float credit) {
        userRepo.updateCredit(userId, credit);
    }
}
