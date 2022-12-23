package com.igse.backend.Voucher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class VoucherRepo {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public Voucher getByUserId(int userId) {
        String query = "select * from vouchers where userId = ?";
        return jdbcTemplate.queryForObject(query, new Object[] {userId}, new BeanPropertyRowMapper<>(Voucher.class));
    }
}
