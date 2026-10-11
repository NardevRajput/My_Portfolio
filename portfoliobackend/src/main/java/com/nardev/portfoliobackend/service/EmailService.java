package com.nardev.portfoliobackend.service;

import com.nardev.portfoliobackend.model.Contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String senderEmail;

    // ==========================================
    // EXISTING CONTACT EMAIL - PRESERVED
    // ==========================================

    public void sendContactEmail(Contact contact) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(senderEmail);
        message.setTo("nardevrajput001@gmail.com");

        message.setSubject("New Portfolio Contact Message");

        message.setText(
                "Name: " + contact.getName() + "\n\n" +
                        "Email: " + contact.getEmail() + "\n\n" +
                        "Message:\n" + contact.getMessage());

        mailSender.send(message);

        System.out.println("Contact email sent successfully");
    }

    // ==========================================
    // PASSWORD RESET OTP EMAIL
    // ==========================================

    public void sendPasswordResetOtp(
            String recipientEmail,
            String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(senderEmail);
        message.setTo(recipientEmail);

        message.setSubject("Your Admin Password Reset OTP");

        message.setText(
                "Hello,\n\n" +
                        "We received a request to reset your portfolio admin password.\n\n" +
                        "Your verification code is: " + otp + "\n\n" +
                        "This OTP is valid for 5 minutes.\n\n" +
                        "If you did not request a password reset, please ignore this email.\n\n" +
                        "Regards,\n" +
                        "Nardev Portfolio Security");

        mailSender.send(message);
    }
}