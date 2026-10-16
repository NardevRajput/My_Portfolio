package com.nardev.portfoliobackend.controller;

import com.nardev.portfoliobackend.model.Experience;
import com.nardev.portfoliobackend.model.ExperienceSettings;
import com.nardev.portfoliobackend.service.ExperienceService;
import com.nardev.portfoliobackend.service.ExperienceSettingsService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experience")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:8081",
        "http://localhost:3000"
})
public class ExperienceController {

    private final ExperienceService experienceService;
    private final ExperienceSettingsService experienceSettingsService;

    public ExperienceController(
            ExperienceService experienceService,
            ExperienceSettingsService experienceSettingsService) {

        this.experienceService = experienceService;
        this.experienceSettingsService = experienceSettingsService;
    }

    // Get all experiences
    @GetMapping
    public ResponseEntity<List<Experience>> getAllExperiences() {
        return ResponseEntity.ok(
                experienceService.getAllExperiences());
    }

    // Get Experience section settings
    // IMPORTANT: Keep this endpoint separate from /{id}.
    @GetMapping("/settings")
    public ResponseEntity<ExperienceSettings> getSettings() {
        return ResponseEntity.ok(
                experienceSettingsService.getSettings());
    }

    // Update Experience section settings
    @PutMapping("/settings")
    public ResponseEntity<ExperienceSettings> updateSettings(
            @RequestBody ExperienceSettings settings) {

        return ResponseEntity.ok(
                experienceSettingsService.updateSettings(settings));
    }

    // Get experience by ID
    @GetMapping("/{id}")
    public ResponseEntity<Experience> getExperienceById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                experienceService.getExperienceById(id));
    }

    // Add new experience
    @PostMapping
    public ResponseEntity<Experience> createExperience(
            @RequestBody Experience experience) {

        Experience savedExperience = experienceService.createExperience(experience);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedExperience);
    }

    // Update experience
    @PutMapping("/{id}")
    public ResponseEntity<Experience> updateExperience(
            @PathVariable Long id,
            @RequestBody Experience experience) {

        return ResponseEntity.ok(
                experienceService.updateExperience(id, experience));
    }

    // Delete experience
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExperience(
            @PathVariable Long id) {

        experienceService.deleteExperience(id);

        return ResponseEntity.noContent().build();
    }
}