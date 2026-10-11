package com.nardev.portfoliobackend.service;

import com.nardev.portfoliobackend.model.Experience;
import com.nardev.portfoliobackend.repository.ExperienceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienceService {

    private final ExperienceRepository experienceRepository;

    public ExperienceService(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    // Get all experience records
    public List<Experience> getAllExperiences() {
        return experienceRepository.findAll();
    }

    // Get experience by ID
    public Experience getExperienceById(Long id) {
        return experienceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Experience not found with ID: " + id));
    }

    // Add new experience
    public Experience createExperience(Experience experience) {
        experience.setId(null);
        return experienceRepository.save(experience);
    }

    // Update existing experience
    public Experience updateExperience(Long id, Experience updatedExperience) {

        Experience existing = getExperienceById(id);

        existing.setRole(updatedExperience.getRole());
        existing.setCompany(updatedExperience.getCompany());
        existing.setPeriod(updatedExperience.getPeriod());
        existing.setDescription(updatedExperience.getDescription());

        return experienceRepository.save(existing);
    }

    // Delete experience
    public void deleteExperience(Long id) {
        Experience existing = getExperienceById(id);
        experienceRepository.delete(existing);
    }
}