package com.igse.backend.user;

import com.igse.backend.Auth.AuthManager;
import com.igse.backend.Bill.Bill;
import com.igse.backend.Credit.CreditService;
import com.igse.backend.ErrorHandling.AppException;
import com.igse.backend.Prices.Prices;
import com.igse.backend.Prices.PricesService;
import com.igse.backend.Reading.Reading;
import com.igse.backend.Reading.ReadingService;
import com.igse.backend.Utils.DateUtils;
import com.igse.backend.Utils.JwtUtil;
import com.igse.backend.Voucher.Voucher;
import com.igse.backend.Voucher.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    @Autowired
    PricesService pricesService;
    @Autowired
    ReadingService readingService;
    @Autowired
    DateUtils dateUtils;


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


    public int getPropertyCount(String type) {
        return userRepo.getPropertyCount(type);
    }

    public List<User> getByPropertyType(String propertyType, int numOfBedrooms) {
        return  userRepo.getByPropertyType(propertyType, numOfBedrooms);
    }

    public float getAvgEnergyCost(int userId) {
        Prices prices = pricesService.getPrices();

        Reading lastReading = readingService.getLastReading(userId);
        Reading previousReading = readingService.getPreviousReading(userId, lastReading);

        if (previousReading != null) {
            int days = dateUtils.getDaysBetween(lastReading.getDate(), previousReading.getDate());

            float gas = ((lastReading.getGas() - previousReading.getGas()) * prices.getGas()) / days;
            float electricityDay = ((lastReading.getElectricityDay() - previousReading.getElectricityDay()) * prices.getElectricityDay()) / days;
            float electricityNight = ((lastReading.getElectricityNight() - previousReading.getElectricityNight()) * prices.getElectricityNight()) / days;

            float total = (gas + electricityNight + electricityDay) / 3;;

            return total;
        }
        return 0;
    }

    public List<User> getUsers() {
    return userRepo.getUsers().stream().map(user -> {
        user.setPassword(null);
        return user;
    }).collect(Collectors.toList());
    }
}
