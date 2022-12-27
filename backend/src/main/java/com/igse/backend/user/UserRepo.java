package com.igse.backend.user;

import com.igse.backend.ErrorHandling.AppException;
import com.igse.backend.Voucher.Voucher;
import com.igse.backend.Voucher.VoucherRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

@Repository
@Slf4j
public class UserRepo {
    @Autowired
    JdbcTemplate jdbcTemplate;
    @Autowired
    VoucherRepo voucherRepo;

    public User findByEmail(String username) {
        String query = "select * from users where email = ?";
        List<User> users = jdbcTemplate.query(query, new Object[]{username}, new BeanPropertyRowMapper<>(User.class));

        if (users.isEmpty())
            return null;
        return users.get(0);
    }

    public User createUser(User user) throws Exception {
        String query = "insert into users (email, address, propertyType, role, numOfBedrooms, password) values (?, ?, ?, ?, ?, ?)";
        try {
            //jdbcTemplate.update(query, user.getEmail(), user.getAddress(), user.getPropertyType().name(), user.getRole().name(), user.getNumOfBedrooms(), user.getPassword());
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(
                    new PreparedStatementCreator() {
                        public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                            PreparedStatement ps =
                                    connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);

                            ps.setString(1, user.getEmail());
                            ps.setString(2, user.getAddress());
                            ps.setString(3, user.getPropertyType().name());
                            ps.setString(4, user.getRole().name());
                            ps.setInt(5, user.getNumOfBedrooms());
                            ps.setString(6, user.getPassword());

                            return ps;
                        }
                    },
                    keyHolder);

            user.setPassword(null);
            user.setId( keyHolder.getKey().intValue());

            return user;
        }
        catch (DataIntegrityViolationException e) {
            throw new AppException("Username is already in use!");
        }
    }

    public void addCredit(int id, float credit) {
        String query = "update users set credit = credit + ? where id = ?";
        jdbcTemplate.update(query, credit, id);
    }
}
