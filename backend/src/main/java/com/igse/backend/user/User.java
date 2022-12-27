package com.igse.backend.user;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    private int id;
    private String email;
    private String password;
    private String address;
    private int numOfBedrooms;
    private PropertyType propertyType;
    private UserRole role;
    private String voucher;
    private float credit;
}
