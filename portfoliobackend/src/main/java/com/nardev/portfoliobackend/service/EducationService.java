package com.nardev.portfoliobackend.service;

import com.nardev.portfoliobackend.model.Education;
import com.nardev.portfoliobackend.repository.EducationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducationService {

    private final EducationRepository educationRepository;

    public EducationService(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    // Get all education records
    public List<Education> getAllEducation() {
        return educationRepository.findAll();
    }

    // Get education record by ID
    public Education getEducationById(Long id) {
        return educationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Education not found with ID: " + id));
    }

    // Add new education record
    public Education addEducation(Education education) {
        education.setId(null);
        validateEducation(education);
        return educationRepository.save(education);
    }

    // Update existing education record
    public Education updateEducation(Long id, Education updatedEducation) {
        Education existing = getEducationById(id);

        validateEducation(updatedEducation);

        existing.setDegree(updatedEducation.getDegree());
        existing.setYear(updatedEducation.getYear());
        existing.setInstitution(updatedEducation.getInstitution());
        existing.setLocation(updatedEducation.getLocation());
        existing.setDescription(updatedEducation.getDescription());

        return educationRepository.save(existing);
    }

    // Delete education record
    public void deleteEducation(Long id) {
        Education education = getEducationById(id);
        educationRepository.delete(education);
    }

    // Basic validation
    private void validateEducation(Education education) {
        if (education.getDegree() == null
                || education.getDegree().isBlank()) {
            throw new IllegalArgumentException("Degree is required");
        }

        if (education.getInstitution() == null
                || education.getInstitution().isBlank()) {
            throw new IllegalArgumentException("Institution is required");
        }

        if (education.getYear() == null
                || education.getYear().isBlank()) {
            throw new IllegalArgumentException("Year is required");
        }
    }
}