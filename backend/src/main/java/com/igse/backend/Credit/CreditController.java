package com.igse.backend.Credit;

import com.igse.backend.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("credit")
@ResponseBody
public class CreditController {
    @Autowired
    CreditService creditService;
    
    @PostMapping("/topup")
    public void topup(@RequestBody User user) {
        creditService.topUp(user);
    }
}
