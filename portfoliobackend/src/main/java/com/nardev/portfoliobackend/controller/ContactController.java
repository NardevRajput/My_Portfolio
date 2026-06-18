package com.nardev.portfoliobackend.controller;

import com.nardev.portfoliobackend.dto.ContactRequestDTO;
import com.nardev.portfoliobackend.model.Contact;
import com.nardev.portfoliobackend.repository.ContactRepository;
import com.nardev.portfoliobackend.response.ApiResponse;
import com.nardev.portfoliobackend.service.EmailService;
import com.nardev.portfoliobackend.service.ExcelService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    ```
    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private ExcelService excelService;

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ApiResponse<Contact> saveContact(
            @Valid @RequestBody ContactRequestDTO dto) {

        Contact contact = new Contact();

        contact.setName(dto.getName());
        contact.setEmail(dto.getEmail());
        contact.setMessage(dto.getMessage());

        Contact savedContact = contactRepository.save(contact);

        // excelService.saveToExcel(contact);

        try {
            System.out.println("Starting email send...");
            emailService.sendContactEmail(contact);
            System.out.println("Email sent successfully");
        } catch (Exception e) {
            System.out.println("EMAIL ERROR: " + e.getMessage());
            e.printStackTrace();
        }

        return new ApiResponse<>(
                true,
                "Contact saved successfully",
                savedContact);
    }

    @GetMapping("/admin/contacts")
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

@DeleteMapping("/admin/{id}")
public ApiResponse<String> deleteContact(
        @PathVariable Integer id) {

    contactRepository.deleteById(id);

    return new ApiResponse<>(
            true,
            "Contact deleted successfully",
            null);
}```

}
