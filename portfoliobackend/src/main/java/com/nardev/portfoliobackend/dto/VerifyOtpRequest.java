package com.nardev.portfoliobackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class VerifyOtpRequest {

    @NotNull
    private Long requestId;

    @NotBlank
    @Pattern(regexp = "\\d{6}", message = "OTP must contain 6 digits")
    private String otp;

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }
}