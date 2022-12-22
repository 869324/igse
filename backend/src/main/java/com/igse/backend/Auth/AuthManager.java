package com.igse.backend.Auth;

import com.igse.backend.ErrorHandling.AppException;
import com.igse.backend.user.LoginRequest;
import com.igse.backend.user.User;
import com.igse.backend.user.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthManager {
    @Autowired
    UserRepo userRepo;
    @Autowired
    PasswordEncoder passwordEncoder;

    public void authenticate(LoginRequest loginRequest) {
        User user = userRepo.findByEmail(loginRequest.getUsername());
        if (user == null) {
            throw new AppException("Invalid Username or Password");
        } else {

            if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                throw new AppException("Invalid Username or Password");
            }
        }
    }
}
