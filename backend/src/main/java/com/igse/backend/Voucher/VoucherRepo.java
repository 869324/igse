package com.igse.backend.Voucher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class VoucherRepo {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public Voucher getByCode(String code) {
        String query = "select * from vouchers where code = ?";
        return jdbcTemplate.queryForObject(query, new Object[] {code}, new BeanPropertyRowMapper<>(Voucher.class));
    }

    public List<Voucher> getByUserId(int userId) {
        String query = "select v.* from users_vouchers uv join vouchers v " +
                "on uv.voucherId = v.id where uv.userId = ?";
        return jdbcTemplate.query(query, new Object[] {userId}, new BeanPropertyRowMapper<>(Voucher.class));
    }

    public boolean getIsUsed(int voucherId) {
        String query = "select * from users_vouchers where voucherId = ?";
        List<Map<String, Object>> vouchers = jdbcTemplate.queryForList(query, voucherId);
        return  vouchers.size() > 0;
    }

    public void updateOwner(int userId, int voucherId) {
        String query = "insert into users_vouchers (userId, voucherId) values (?, ?)";
        jdbcTemplate.update(query, userId, voucherId);
    }
}
