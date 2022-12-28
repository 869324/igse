package com.igse.backend.Prices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class PricesRepo {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public Prices getPrices () {
        String query = "select * from prices limit 1";
        return jdbcTemplate.queryForObject(query, new Object[] {}, new BeanPropertyRowMapper<>(Prices.class));
    }

    public void updatePrices(Prices prices) {
        String query = "update prices set gas = ?, electricityDay = ?, electricityNight = ?, standingCharge = ? where id = ?";
        jdbcTemplate.update(query, prices.getGas(), prices.getElectricityDay(), prices.getElectricityNight(), prices.getStandingCharge(), prices.getId());
    }
}
