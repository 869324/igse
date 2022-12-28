package com.igse.backend.Igse;

import com.igse.backend.user.PropertyTypeMap;
import com.igse.backend.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Repository
public class IgseRepo {
    @Autowired
    JdbcTemplate jdbcTemplate;



}
