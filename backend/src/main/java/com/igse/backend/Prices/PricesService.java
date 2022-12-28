package com.igse.backend.Prices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PricesService {
    @Autowired
    PricesRepo pricesRepo;

    public Prices getPrices() {
        return pricesRepo.getPrices();
    }

    public void updatePrices(Prices prices) {
        pricesRepo.updatePrices(prices);
    }
}
