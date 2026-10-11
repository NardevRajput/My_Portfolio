package com.nardev.portfoliobackend.controller;

import com.nardev.portfoliobackend.model.Education;
import com.nardev.portfoliobackend.service.EducationService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/education")
public class EducationController {

    private final EducationService educationService;

    public EducationController(EducationService educationService) {
        this.educationService = educationService;
    }

    // GET: Fetch all education records
    @GetMapping
    public ResponseEntity<List<Education>> getAllEducation() {
        return ResponseEntity.ok(
                educationService.getAllEducation());
    }

    // GET: Fetch education by ID
    @GetMapping("/{id}")
    public ResponseEntity<Education> getEducationById(
            @PathVariable Long id) {
        return ResponseEntity.ok(
                educationService.getEducationById(id));
    }

    // POST: Add new education
    @PostMapping
    public ResponseEntity<Education> addEducation(
            @RequestBody Education education) {
        Education saved = educationService.addEducation(education);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }

    // PUT: Update education
    @PutMapping("/{id}")
    public ResponseEntity<Education> updateEducation(
            @PathVariable Long id,
            @RequestBody Education education) {
        return ResponseEntity.ok(
                educationService.updateEducation(id, education));
    }

    // DELETE: Delete education
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEducation(
            @PathVariable Long id) {
        educationService.deleteEducation(id);

        return ResponseEntity.noContent().build();
    }
}