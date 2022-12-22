package com.igse.backend.Auth;

import com.igse.backend.user.LoginRequest;
import com.igse.backend.user.User;
import com.igse.backend.user.UserEntityToUserConverter;
import com.igse.backend.user.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("auth")
@ResponseBody
@Slf4j
public class AuthController {
    @Autowired
    AuthService authService;
    @Autowired
    UserEntityToUserConverter userEntityToUserConverter;

    @PostMapping(value = "/login")
    public Object login(@RequestBody LoginRequest loginRequest) throws Exception {
        return authService.login(loginRequest);
    }

    @PostMapping(value = "/verifyToken")
    public Object verifyToken(@RequestBody String token) throws Exception {
        return authService.verifyToken(token);
    }
}
