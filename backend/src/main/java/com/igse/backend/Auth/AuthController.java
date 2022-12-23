package com.igse.backend.Auth;

import com.igse.backend.user.LoginRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@ResponseBody
@Slf4j
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping(value = "/login")
    public Object login(@RequestBody LoginRequest loginRequest) throws Exception {
        return authService.login(loginRequest);
    }

    @PostMapping(value = "/verifyToken")
    public Object verifyToken(@RequestBody String token) throws Exception {
        return authService.verifyToken(token);
    }
}
