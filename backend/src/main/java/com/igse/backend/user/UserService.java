package com.igse.backend.user;

import com.igse.backend.Auth.AuthManager;
import com.igse.backend.ErrorHandling.AppException;
import com.igse.backend.Utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private AuthManager authManager;
    @Autowired
    private UserRepo userRepo;

    public Object login(LoginRequest loginRequest) {
        try {
            authManager.authenticate(loginRequest);
            String token = jwtUtil.generateToken(loginRequest.getUsername());
            User user = userRepo.findByEmail(loginRequest.getUsername());
            return  Map.of("token", token, "user", user);
        }catch (Exception ex) {
            throw new AppException(ex.getMessage());
        }


    };

    public User signup(User user) throws Exception {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User createdUser = userRepo.createUser(user);
            userRepo.assignVoucherId(createdUser.getId(), createdUser.getVoucherId());
            return createdUser;
        } catch (Exception ex) {
            throw ex;
        }
    }

}
