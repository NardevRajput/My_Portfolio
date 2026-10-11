package com.nardev.portfoliobackend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Service
public class SmsService {

    @Value("${twilio.account-sid:}")
    private String accountSid;

    @Value("${twilio.auth-token:}")
    private String authToken;

    @Value("${twilio.phone-number:}")
    private String fromNumber;

    private final HttpClient httpClient = HttpClient.newHttpClient();

    public void sendPasswordResetOtp(String mobile, String otp) {

        if (accountSid == null || accountSid.isBlank()
                || authToken == null || authToken.isBlank()
                || fromNumber == null || fromNumber.isBlank()) {

            throw new IllegalStateException(
                    "Twilio SMS credentials are not configured");
        }

        try {
            String url = "https://api.twilio.com/2010-04-01/Accounts/"
                    + accountSid + "/Messages.json";

            String body = "To=" + encode(mobile)
                    + "&From=" + encode(fromNumber)
                    + "&Body=" + encode(
                            "Your Nardev Portfolio password reset OTP is "
                                    + otp + ". Valid for 5 minutes. Do not share it.");

            String credentials = accountSid + ":" + authToken;

            String authorization = Base64.getEncoder().encodeToString(
                    credentials.getBytes(StandardCharsets.UTF_8));

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Authorization", "Basic " + authorization)
                    .header(
                            "Content-Type",
                            "application/x-www-form-urlencoded")
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build();

            HttpResponse<String> response = httpClient.send(
                    request,
                    HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() < 200
                    || response.statusCode() >= 300) {

                throw new IllegalStateException(
                        "SMS provider rejected the request");
            }

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("SMS sending was interrupted");

        } catch (Exception e) {
            throw new IllegalStateException("Unable to send SMS OTP");
        }
    }

    private String encode(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }
}