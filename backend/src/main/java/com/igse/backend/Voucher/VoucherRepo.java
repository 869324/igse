package com.igse.backend.Voucher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class VoucherRepo {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public Voucher getByCode(String code) {
        String query = "select * from vouchers where code = ?";
        return jdbcTemplate.queryForObject(query, new Object[] {code}, new BeanPropertyRowMapper<>(Voucher.class));
    }

    public Voucher getByUserId(int userId) {
        String query = "select * from vouchers where userId = ?";
        return jdbcTemplate.queryForObject(query, new Object[] {userId}, new BeanPropertyRowMapper<>(Voucher.class));
    }

    public void updateOwner(int userId, int voucherId) {
        String query = "update vouchers set userId = ? where id = ?";
        jdbcTemplate.update(query, userId, voucherId);
    }
}
