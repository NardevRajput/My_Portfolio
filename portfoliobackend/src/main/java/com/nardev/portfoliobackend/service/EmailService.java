package com.nardev.portfoliobackend.service;

import com.nardev.portfoliobackend.model.Contact;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    private static final String RESEND_API_URL = "https://api.resend.com/emails";

    private final RestClient restClient;

    @Value("${RESEND_API_KEY}")
    private String resendApiKey;

    @Value("${RESEND_FROM_EMAIL:onboarding@resend.dev}")
    private String senderEmail;

    public EmailService() {
        this.restClient = RestClient.create();
    }

    // ==========================================
    // SEND EMAIL THROUGH RESEND API
    // ==========================================

    private void sendEmail(
            String recipientEmail,
            String subject,
            String text) {

        Map<String, Object> requestBody = Map.of(
                "from", senderEmail,
                "to", List.of(recipientEmail),
                "subject", subject,
                "text", text);

        try {
            restClient.post()
                    .uri(RESEND_API_URL)
                    .header("Authorization", "Bearer " + resendApiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestBody)
                    .retrieve()
                    .toBodilessEntity();

            System.out.println(
                    "Email sent successfully to: " + recipientEmail);

        } catch (RestClientResponseException exception) {

            System.err.println("Resend API request failed.");
            System.err.println(
                    "HTTP status: " + exception.getStatusCode());

            throw new IllegalStateException(
                    "Unable to send email. Please try again later.",
                    exception);

        } catch (Exception exception) {

            System.err.println(
                    "Email delivery failed: "
                            + exception.getClass().getSimpleName());

            throw new IllegalStateException(
                    "Unable to send email. Please try again later.",
                    exception);
        }
    }

    // ==========================================
    // EXISTING CONTACT EMAIL
    // ==========================================

    public void sendContactEmail(Contact contact) {

        String subject = "New Portfolio Contact Message";

        String text = "Name: " + contact.getName() + "\n\n" +
                "Email: " + contact.getEmail() + "\n\n" +
                "Message:\n" + contact.getMessage();

        sendEmail(
                "nardevrajput001@gmail.com",
                subject,
                text);
    }

    // ==========================================
    // PASSWORD RESET OTP EMAIL
    // ==========================================

    public void sendPasswordResetOtp(
            String recipientEmail,
            String otp) {

        String subject = "Your Admin Password Reset OTP";

        String text = "Hello,\n\n" +
                "We received a request to reset your portfolio admin password.\n\n" +
                "Your verification code is: " + otp + "\n\n" +
                "This OTP is valid for 5 minutes.\n\n" +
                "If you did not request a password reset, please ignore this email.\n\n" +
                "Regards,\n" +
                "Nardev Portfolio Security";

        sendEmail(
                recipientEmail,
                subject,
                text);
    }
}