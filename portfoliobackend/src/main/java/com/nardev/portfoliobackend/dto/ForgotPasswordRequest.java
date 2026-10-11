package com.nardev.portfoliobackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class ForgotPasswordRequest {

    @NotBlank
    private String username;

    @NotBlank
    @Pattern(regexp = "EMAIL|SMS", message = "Method must be EMAIL or SMS")
    private String method;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }
}