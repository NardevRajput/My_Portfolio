package com.nardev.portfoliobackend.service;

import com.nardev.portfoliobackend.model.Admin;
import com.nardev.portfoliobackend.model.PasswordResetOtp;
import com.nardev.portfoliobackend.repository.AdminRepository;
import com.nardev.portfoliobackend.repository.PasswordResetOtpRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.HexFormat;
import java.util.List;
import java.util.Locale;

@Service
public class PasswordResetService {

    private final AdminRepository adminRepository;
    private final PasswordResetOtpRepository otpRepository;
    private final EmailService emailService;
    private final SmsService smsService;
    private final PasswordEncoder passwordEncoder;

    private final SecureRandom secureRandom = new SecureRandom();

    public PasswordResetService(
            AdminRepository adminRepository,
            PasswordResetOtpRepository otpRepository,
            EmailService emailService,
            SmsService smsService,
            PasswordEncoder passwordEncoder) {

        this.adminRepository = adminRepository;
        this.otpRepository = otpRepository;
        this.emailService = emailService;
        this.smsService = smsService;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Supports admin username, registered email, or registered mobile.
     * The selected method determines where the OTP is delivered.
     */
    @Transactional
    public Long sendOtp(String identifier, String method) {

        if (identifier == null || identifier.isBlank()) {
            throw new IllegalArgumentException(
                    "Please enter your username, email, or mobile number");
        }

        if (method == null || method.isBlank()) {
            throw new IllegalArgumentException(
                    "Please select a recovery method");
        }

        String normalizedIdentifier = identifier.trim();
        String normalizedMethod = method.trim().toUpperCase(Locale.ROOT);

        if (!normalizedMethod.equals("EMAIL")
                && !normalizedMethod.equals("SMS")) {

            throw new IllegalArgumentException(
                    "Invalid verification method");
        }

        // Find the account using username, email, or mobile.
        Admin admin = findAdmin(normalizedIdentifier);

        // Check destination details before creating an OTP.
        if (normalizedMethod.equals("EMAIL")) {

            if (admin.getEmail() == null || admin.getEmail().isBlank()) {
                throw new IllegalStateException(
                        "No registered email is available for this account");
            }

        } else {

            if (admin.getMobile() == null || admin.getMobile().isBlank()) {
                throw new IllegalStateException(
                        "No registered mobile number is available for this account");
            }
        }

        LocalDateTime now = LocalDateTime.now();

        List<PasswordResetOtp> previousRequests = otpRepository.findByAdminAndUsedFalse(admin);

        for (PasswordResetOtp previous : previousRequests) {

            if (previous.getCreatedAt() != null
                    && previous.getCreatedAt().isAfter(now.minusSeconds(60))) {

                throw new IllegalStateException(
                        "Please wait 60 seconds before requesting another OTP");
            }

            previous.setUsed(true);
        }

        otpRepository.saveAll(previousRequests);

        // Generate a secure six-digit OTP.
        String otp = String.format(
                Locale.ROOT,
                "%06d",
                secureRandom.nextInt(1_000_000));

        PasswordResetOtp resetRequest = new PasswordResetOtp();

        resetRequest.setAdmin(admin);
        resetRequest.setOtpHash(sha256(otp));
        resetRequest.setMethod(normalizedMethod);
        resetRequest.setExpiresAt(now.plusMinutes(5));
        resetRequest.setAttempts(0);
        resetRequest.setUsed(false);

        PasswordResetOtp saved = otpRepository.save(resetRequest);

        try {

            if (normalizedMethod.equals("EMAIL")) {

                // Deliver to the email registered for this admin.
                emailService.sendPasswordResetOtp(
                        admin.getEmail(),
                        otp);

            } else {

                // Deliver to the mobile registered for this admin.
                smsService.sendPasswordResetOtp(
                        admin.getMobile(),
                        otp);
            }

        } catch (RuntimeException exception) {

            saved.setUsed(true);
            otpRepository.save(saved);

            // Keep the original exception available in server logs.
            throw new IllegalStateException(
                    "Unable to send OTP. Check the selected delivery method configuration.",
                    exception);
        }

        return saved.getId();
    }

    /**
     * Finds an admin by username, email, or mobile number.
     */
    private Admin findAdmin(String identifier) {

        return adminRepository.findByUsername(identifier)
                .or(() -> adminRepository.findByEmail(identifier))
                .or(() -> adminRepository.findByMobile(identifier))
                .orElseThrow(() -> new IllegalArgumentException(
                        "Unable to process password reset request"));
    }

    /**
     * Verifies the OTP and generates a short-lived reset token.
     */
    @Transactional
    public String verifyOtp(Long requestId, String otp) {

        if (requestId == null || otp == null || otp.isBlank()) {
            throw new IllegalArgumentException(
                    "Please enter a valid OTP");
        }

        PasswordResetOtp request = otpRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Invalid OTP request"));

        LocalDateTime now = LocalDateTime.now();

        if (request.isUsed()) {
            throw new IllegalArgumentException(
                    "OTP request has expired or has already been used");
        }

        if (request.getExpiresAt().isBefore(now)) {

            request.setUsed(true);
            otpRepository.save(request);

            throw new IllegalArgumentException("OTP has expired");
        }

        if (request.getAttempts() >= 5) {

            request.setUsed(true);
            otpRepository.save(request);

            throw new IllegalArgumentException(
                    "Too many incorrect OTP attempts");
        }

        request.setAttempts(request.getAttempts() + 1);

        String submittedOtpHash = sha256(otp.trim());

        if (!MessageDigest.isEqual(
                submittedOtpHash.getBytes(StandardCharsets.UTF_8),
                request.getOtpHash().getBytes(StandardCharsets.UTF_8))) {

            if (request.getAttempts() >= 5) {
                request.setUsed(true);
            }

            otpRepository.save(request);

            throw new IllegalArgumentException("Invalid OTP");
        }

        // OTP is single-use after successful verification.
        request.setUsed(true);
        request.setVerifiedAt(now);

        // Generate a cryptographically secure reset token.
        byte[] randomBytes = new byte[32];
        secureRandom.nextBytes(randomBytes);

        String resetToken = Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(randomBytes);

        request.setResetTokenHash(sha256(resetToken));
        request.setResetTokenExpiresAt(now.plusMinutes(10));

        otpRepository.save(request);

        return resetToken;
    }

    /**
     * Resets the admin password using BCrypt.
     */
    @Transactional
    public void resetPassword(String resetToken, String newPassword) {

        if (newPassword == null
                || newPassword.length() < 12
                || newPassword.length() > 72) {

            throw new IllegalArgumentException(
                    "Password must contain between 12 and 72 characters");
        }

        if (resetToken == null || resetToken.isBlank()) {
            throw new IllegalArgumentException("Invalid reset token");
        }

        String tokenHash = sha256(resetToken);

        LocalDateTime now = LocalDateTime.now();

        // Find the matching, verified, unexpired reset token.
        List<PasswordResetOtp> requests = otpRepository.findAll();

        PasswordResetOtp matched = requests.stream()
                .filter(request -> request.getResetTokenHash() != null)
                .filter(request -> MessageDigest.isEqual(
                        request.getResetTokenHash()
                                .getBytes(StandardCharsets.UTF_8),
                        tokenHash.getBytes(StandardCharsets.UTF_8)))
                .filter(request -> request.getVerifiedAt() != null)
                .filter(request -> request.getResetTokenExpiresAt() != null)
                .filter(request -> request.getResetTokenExpiresAt()
                        .isAfter(now))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Invalid or expired reset token"));

        Admin admin = matched.getAdmin();

        // Always save the new password as a BCrypt hash.
        admin.setPassword(passwordEncoder.encode(newPassword));
        adminRepository.save(admin);

        // Make the reset token single-use.
        matched.setResetTokenHash(null);
        matched.setResetTokenExpiresAt(null);
        matched.setVerifiedAt(null);

        otpRepository.save(matched);
    }

    /**
     * Creates a SHA-256 hash for OTPs and reset tokens.
     */
    private String sha256(String value) {

        try {

            MessageDigest digest = MessageDigest.getInstance("SHA-256");

            return HexFormat.of().formatHex(
                    digest.digest(value.getBytes(StandardCharsets.UTF_8)));

        } catch (Exception exception) {

            throw new IllegalStateException(
                    "Unable to process security token",
                    exception);
        }
    }
}