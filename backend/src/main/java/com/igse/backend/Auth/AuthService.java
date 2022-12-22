package com.igse.backend.Auth;

import com.igse.backend.ErrorHandling.AppException;
import com.igse.backend.Utils.JwtUtil;
import com.igse.backend.user.LoginRequest;
import com.igse.backend.user.User;
import com.igse.backend.user.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Map;

@Service
public class AuthService {
    @Autowired
    AuthManager authManager;
    @Autowired
    JwtUtil jwtUtil;
    @Autowired
    UserRepo userRepo;


    public Object login(LoginRequest loginRequest) {
        try {
            authManager.authenticate(loginRequest);
            String token = jwtUtil.generateToken(loginRequest.getUsername());
            User user = userRepo.findByEmail(loginRequest.getUsername());
            user.setPassword(null);
            return  Map.of("token", token, "user", user);
        }catch (Exception ex) {
            throw new AppException(ex.getMessage());
        }
    };

    public boolean verifyToken(String token) {
        String username = jwtUtil.extractUsername(token);
        User user = userRepo.findByEmail(username);
        return jwtUtil.validateToken(token, new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>()));
    }
}
