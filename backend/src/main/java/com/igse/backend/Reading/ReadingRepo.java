package com.igse.backend.Reading;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ReadingRepo {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public void createReading(Reading reading) {
        String query = "insert into readings (userId, date, gas, electricityDay, electricityNight) " +
                "value (?, ?, ?, ?, ?";
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
}
