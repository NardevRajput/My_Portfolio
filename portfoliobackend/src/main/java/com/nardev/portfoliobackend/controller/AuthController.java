package com.nardev.portfoliobackend.controller;

import com.nardev.portfoliobackend.dto.ForgotPasswordRequest;
import com.nardev.portfoliobackend.dto.LoginRequest;
import com.nardev.portfoliobackend.dto.ResetPasswordRequest;
import com.nardev.portfoliobackend.dto.VerifyOtpRequest;

import com.nardev.portfoliobackend.jwt.JwtService;
import com.nardev.portfoliobackend.service.PasswordResetService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;
        private final PasswordResetService passwordResetService;

        public AuthController(
                        JwtService jwtService,
                        AuthenticationManager authenticationManager,
                        PasswordResetService passwordResetService) {

                this.jwtService = jwtService;
                this.authenticationManager = authenticationManager;
                this.passwordResetService = passwordResetService;
        }

        // Existing login API
        @PostMapping("/login")
        public ResponseEntity<?> login(
                        @Valid @RequestBody LoginRequest request) {

                Authentication authentication = authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getUsername(),
                                                request.getPassword()));

                if (authentication.isAuthenticated()) {

                        String token = jwtService.generateToken(
                                        request.getUsername());

                        return ResponseEntity.ok(Map.of("token", token));
                }

                return ResponseEntity.badRequest()
                                .body(Map.of("message", "Invalid credentials"));
        }

        // Send OTP
        @PostMapping("/forgot-password")
        public ResponseEntity<?> forgotPassword(
                        @Valid @RequestBody ForgotPasswordRequest request) {

                try {
                        Long requestId = passwordResetService.sendOtp(
                                        request.getUsername(),
                                        request.getMethod());

                        return ResponseEntity.ok(Map.of(
                                        "message", "OTP sent successfully",
                                        "requestId", requestId));

                } catch (IllegalArgumentException
                                | IllegalStateException exception) {

                        return ResponseEntity.badRequest().body(Map.of(
                                        "message", exception.getMessage()));
                }
        }

        // Verify OTP
        @PostMapping("/verify-otp")
        public ResponseEntity<?> verifyOtp(
                        @Valid @RequestBody VerifyOtpRequest request) {

                try {
                        String resetToken = passwordResetService.verifyOtp(
                                        request.getRequestId(),
                                        request.getOtp());

                        return ResponseEntity.ok(Map.of(
                                        "message", "OTP verified successfully",
                                        "resetToken", resetToken));

                } catch (IllegalArgumentException
                                | IllegalStateException exception) {

                        return ResponseEntity.badRequest().body(Map.of(
                                        "message", exception.getMessage()));
                }
        }

        // Reset password
        @PostMapping("/reset-password")
        public ResponseEntity<?> resetPassword(
                        @Valid @RequestBody ResetPasswordRequest request) {

                try {
                        passwordResetService.resetPassword(
                                        request.getResetToken(),
                                        request.getNewPassword());

                        return ResponseEntity.ok(Map.of(
                                        "message",
                                        "Password reset successfully. Please log in again."));

                } catch (IllegalArgumentException
                                | IllegalStateException exception) {

                        return ResponseEntity.badRequest().body(Map.of(
                                        "message", exception.getMessage()));
                }
        }
}