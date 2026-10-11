package com.nardev.portfoliobackend.controller;

import com.nardev.portfoliobackend.model.ApplicationItem;
import com.nardev.portfoliobackend.model.ApplicationSectionContent;
import com.nardev.portfoliobackend.service.ApplicationService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = {
        "http://localhost:8081",
        "http://localhost:5173"
})
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    // GET: All applications
    @GetMapping
    public ResponseEntity<List<ApplicationItem>> getAllApplications() {
        return ResponseEntity.ok(
                applicationService.getAllApplications());
    }

    // GET: Application by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApplicationItem> getApplicationById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                applicationService.getApplicationById(id));
    }

    // POST: Add application
    @PostMapping
    public ResponseEntity<ApplicationItem> createApplication(
            @Valid @RequestBody ApplicationItem application) {

        return ResponseEntity.ok(
                applicationService.createApplication(application));
    }

    // PUT: Update application
    @PutMapping("/{id}")
    public ResponseEntity<ApplicationItem> updateApplication(
            @PathVariable Long id,
            @Valid @RequestBody ApplicationItem application) {

        return ResponseEntity.ok(
                applicationService.updateApplication(id, application));
    }

    // DELETE: Delete application
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(
            @PathVariable Long id) {

        applicationService.deleteApplication(id);

        return ResponseEntity.noContent().build();
    }

    // GET: Section headings and descriptions
    @GetMapping("/section")
    public ResponseEntity<ApplicationSectionContent> getSectionContent() {
        return ResponseEntity.ok(
                applicationService.getSectionContent());
    }

    // PUT: Update section headings and descriptions
    @PutMapping("/section")
    public ResponseEntity<ApplicationSectionContent> updateSectionContent(
            @RequestBody ApplicationSectionContent content) {

        return ResponseEntity.ok(
                applicationService.updateSectionContent(content));
    }
}