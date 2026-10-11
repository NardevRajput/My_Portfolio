package com.nardev.portfoliobackend.controller;

import com.nardev.portfoliobackend.model.Experience;
import com.nardev.portfoliobackend.service.ExperienceService;

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

    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    // Get all experiences
    @GetMapping
    public ResponseEntity<List<Experience>> getAllExperiences() {
        return ResponseEntity.ok(
                experienceService.getAllExperiences());
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