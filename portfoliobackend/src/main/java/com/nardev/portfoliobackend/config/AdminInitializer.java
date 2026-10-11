package com.nardev.portfoliobackend.config;

import com.nardev.portfoliobackend.model.Admin;
import com.nardev.portfoliobackend.repository.AdminRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminInitializer {

    @Bean
    public CommandLineRunner initializeAdmin(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder,
            @Value("${ADMIN_USERNAME:}") String username,
            @Value("${ADMIN_INITIAL_PASSWORD:}") String initialPassword,
            @Value("${ADMIN_EMAIL:}") String email,
            @Value("${ADMIN_MOBILE:}") String mobile) {

        return args -> {

            // Never create a predictable default admin account.
            if (username.isBlank()
                    || initialPassword.isBlank()
                    || email.isBlank()
                    || mobile.isBlank()) {

                System.out.println(
                        "Admin initialization skipped: configure ADMIN_* variables.");

                return;
            }

            if (adminRepository.existsByUsername(username)) {
                System.out.println(
                        "Admin already exists; initialization skipped.");
                return;
            }

            if (adminRepository.existsByEmail(email)
                    || adminRepository.existsByMobile(mobile)) {

                throw new IllegalStateException(
                        "Admin email or mobile is already registered.");
            }

            Admin admin = new Admin();

            admin.setUsername(username);
            admin.setPassword(
                    passwordEncoder.encode(initialPassword));
            admin.setEmail(email);
            admin.setMobile(mobile);
            admin.setRole("ADMIN");

            adminRepository.save(admin);

            System.out.println(
                    "Initial admin account created successfully.");
        };
    }
}