package com.nardev.portfoliobackend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class ContactRequestDTO {
    @NotBlank(message = "Name is required")

    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")

    @Pattern(regexp = "^[A-Za-z ]+$", message = "Name can contain only letters and spaces")

    private String name;

    @Email(regexp = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$", message = "Invalid email format")

    @NotBlank(message = "Email is required")

    private String email;

    @NotBlank(message = "Message is required")

    @Size(min = 5, max = 500, message = "Message must be between 5 and 500 characters")

    private String message;

    // GETTERS

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getMessage() {
        return message;
    }

    // SETTERS

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}