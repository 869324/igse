package com.igse.backend.Bill;

import com.igse.backend.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("bill")
@ResponseBody
public class BillController {
    @Autowired
    BillService billService;

    @PostMapping("/get")
    public Object getBills(@RequestBody User user) {
        return billService.getBills(user.getId());
    }

    @PostMapping("/pay")
    public void getBills(@RequestBody Bill bill) {
        billService.payBill(bill);
    }
}
