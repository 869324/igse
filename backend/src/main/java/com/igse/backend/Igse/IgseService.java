package com.igse.backend.Igse;

import com.igse.backend.Bill.Bill;
import com.igse.backend.Prices.PricesService;
import com.igse.backend.user.PropertyTypeMap;
import com.igse.backend.user.User;
import com.igse.backend.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class IgseService {
    @Autowired
    IgseRepo igseRepo;
    @Autowired
    UserService userService;
    @Autowired
    PricesService pricesService;

    private final Map<String, String> propertyTypeMap = PropertyTypeMap.PROPERTY_TYPE_MAP;

    public Object getPropertyCount() {
        List<Map<String, String>> property = new ArrayList<>();

        for (Map.Entry<String, String> entry : propertyTypeMap.entrySet()) {
            int count = userService.getPropertyCount(entry.getValue());
            property.add(Map.of(entry.getKey(), String.valueOf(count)));
        }

        return property;
    }

    public Object getStats(String propertyType, int numOfBedrooms) {
        Map<String, String> map = new HashMap<>();

        List<User> users = userService.getByPropertyType(propertyTypeMap.get(propertyType), numOfBedrooms);
        List<Bill> bills = new ArrayList<>();

        float sum = 0;
        for (User user : users) {
            float avgEnergyCost = userService.getAvgEnergyCost(user.getId());
            sum += avgEnergyCost;
        }

        float avg = sum > 0 ? sum / users.size() : 0;

        return Map.of(
                "type", propertyType,
                "bedroom", String.valueOf(numOfBedrooms),
                "average_electricity_gas_cost_per_day", String.format("%.2f", avg),
                "unit", "pound"
        );
    }
}
