package com.igse.backend.user;

import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserEntityToUserConverter {
    public User convert(Map<String, Object> entity) {
        User user = new User();
        user.setId((Integer) entity.get("id"));
        user.setEmail(entity.get("email").toString());
        user.setPassword(entity.get("password").toString());
        user.setAddress(entity.get("address").toString());
        user.setNumOfBedrooms((Integer) entity.get("numOfBedrooms"));
        user.setPropertyType(PropertyType.valueOf(entity.get("propertyType").toString()));
        user.setRole(UserRole.valueOf(entity.get("role").toString()));

        return user;
    }
}
