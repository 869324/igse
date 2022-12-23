package com.igse.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
@ResponseBody
public class UserController {

    @Autowired
    private UserService userService;



    @PostMapping(value = "/signup")
    public Object signup(@RequestBody User user) throws Exception {
        return userService.signup(user);
    }

    @PostMapping(value = "/data")
    public Object getUserData(@RequestBody String token) throws Exception {
        return userService.getUserData(token);
    }
}
