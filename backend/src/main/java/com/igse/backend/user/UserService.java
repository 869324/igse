package com.igse.backend.user;

import com.igse.backend.Utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepo userRepo;

    public Object login(LoginRequest loginRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
        }catch (Exception e) {
            throw new Exception("Invalid username or password");
        }
        String token = jwtUtil.generateToken(loginRequest.getUsername());
        User user = userRepo.findByEmail(loginRequest.getUsername());
        return  Map.of("token", token, "user", user);

    };

}
