package com.igse.backend.Reading;

import com.igse.backend.Voucher.Voucher;
import com.igse.backend.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Ref;
import java.util.List;

@Repository
public class ReadingRepo {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public void createReading(Reading reading) {
        String query = "insert into readings (userId, date, gas, electricityDay, electricityNight) " +
                "values (?, ?, ?, ?, ?)";
        jdbcTemplate.update(query, reading.getUserId(), reading.getDate(), reading.getGas(), reading.getElectricityDay(), reading.getElectricityNight());
    }
    public Reading getLastReading(int userId) {
        Reading reading = null;
        try {
            String query = "select * from readings where userId = ? order by date desc limit 1";
            reading = jdbcTemplate.queryForObject(query, new Object[]{userId}, new BeanPropertyRowMapper<>(Reading.class));

        }catch (EmptyResultDataAccessException ignored) {}
        return reading;
    }

    public List<Reading> getUnpaidReadings(int userId) {
        String query = "select * from readings where userId = ? and paid = 0";
        List<Reading> readings = jdbcTemplate.query(query, new Object[] {userId}, new BeanPropertyRowMapper<>(Reading.class));
        return readings;
    }

    public Reading getPreviousReading(int userId, Reading reading) {
        Reading previousReading = null;
        try {
            String query = "select * from readings where userId = ? and date < date(?) order by date desc limit 1";
            previousReading = jdbcTemplate.queryForObject(query, new Object[]{userId, reading.getDate()}, new BeanPropertyRowMapper<>(Reading.class));

        }catch (EmptyResultDataAccessException ignored) {}
        return previousReading;
    }

    public Reading getByDate(int userId, String date) {
        try {
            String query = "select * from readings where userId = ? and date = date(?)";
            return jdbcTemplate.queryForObject(query, new Object[]{userId, date}, new BeanPropertyRowMapper<>(Reading.class));
        } catch (EmptyResultDataAccessException ex) {
            return null;
        }
    }

    public void markAsPaid(int readingId) {
        String query = "update readings set paid = 1 where id = ?";
        jdbcTemplate.update(query, readingId);
    }

    public List<Reading> getUserReadings(int userId) {
        String query = "select * from readings where userId = ?";
        return jdbcTemplate.query(query, new Object[] {userId}, new BeanPropertyRowMapper<>(Reading.class));
    }

}
