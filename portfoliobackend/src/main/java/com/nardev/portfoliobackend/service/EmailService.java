package com.nardev.portfoliobackend.service;

import com.nardev.portfoliobackend.model.Contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendContactEmail(Contact contact) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo("nardevrajput001@gmail.com");

        message.setSubject("New Portfolio Contact Message");

        message.setText(
                "Name: " + contact.getName() + "\n\n" +
                        "Email: " + contact.getEmail() + "\n\n" +
                        "Message:\n" + contact.getMessage());

        mailSender.send(message);

        System.out.println("Email sent successfully");
    }
}