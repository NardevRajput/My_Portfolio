package com.nardev.portfoliobackend.controller;

import com.nardev.portfoliobackend.dto.LoginRequest;
import com.nardev.portfoliobackend.jwt.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

        @Autowired
        private JwtService jwtService;

        @Autowired
        private AuthenticationManager authenticationManager;

        @PostMapping("/login")
        public ResponseEntity<?> login(
                        @RequestBody LoginRequest request) {

                System.out.println("LOGIN API HIT");

                Authentication authentication = authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getUsername(),
                                                request.getPassword()));

                if (authentication.isAuthenticated()) {

                        String token = jwtService.generateToken(
                                        request.getUsername());
                        Map<String, String> response = new HashMap<>();

                        response.put("token", token);
                        return ResponseEntity.ok(response);
                }
                return ResponseEntity
                                .badRequest()
                                .body("Invalid credentials");
        }
}