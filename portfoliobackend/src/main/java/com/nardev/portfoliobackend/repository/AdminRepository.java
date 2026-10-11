package com.nardev.portfoliobackend.repository;

import com.nardev.portfoliobackend.model.Admin;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    // Find admin by username
    Optional<Admin> findByUsername(String username);

    // Find admin by registered email
    Optional<Admin> findByEmail(String email);

    // Find admin by registered mobile number
    Optional<Admin> findByMobile(String mobile);

    // Check whether username already exists
    boolean existsByUsername(String username);

    // Check whether email already exists
    boolean existsByEmail(String email);

    // Check whether mobile number already exists
    boolean existsByMobile(String mobile);
}