package com.igse.backend.Prices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("prices")
@ResponseBody
public class PricesController {
    @Autowired
    PricesService pricesService;

    @GetMapping("/getPrices")
    public Prices getPrices() {
        return pricesService.getPrices();
    }

    @PostMapping("/updatePrices")
    public void updatePrices(@RequestBody Prices prices) {
        pricesService.updatePrices(prices);
    }
}
