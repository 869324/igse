package com.igse.backend.user;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Optional;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    private int id;
    private String email;
    private String password;
    private Optional<String> address;
    private Optional<Integer> numOfBedrooms;
    private Optional<PropertyType> propertyType;
    private UserRole role;
    private Optional<String> voucher;
    private Optional<Float> credit;
}
