package com.nardev.portfoliobackend.repository;

import com.nardev.portfoliobackend.model.Admin;
import com.nardev.portfoliobackend.model.PasswordResetOtp;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PasswordResetOtpRepository
        extends JpaRepository<PasswordResetOtp, Long> {

    Optional<PasswordResetOtp> findFirstByAdminAndUsedFalseOrderByCreatedAtDesc(Admin admin);

    List<PasswordResetOtp> findByAdminAndUsedFalse(Admin admin);
}