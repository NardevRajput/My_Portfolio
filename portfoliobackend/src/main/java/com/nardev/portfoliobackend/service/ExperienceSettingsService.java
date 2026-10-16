package com.nardev.portfoliobackend.service;

import com.nardev.portfoliobackend.model.ExperienceSettings;
import com.nardev.portfoliobackend.repository.ExperienceSettingsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ExperienceSettingsService {

    private static final Long SETTINGS_ID = 1L;

    private final ExperienceSettingsRepository repository;

    public ExperienceSettingsService(
            ExperienceSettingsRepository repository) {
        this.repository = repository;
    }

    public ExperienceSettings getSettings() {
        return repository.findById(SETTINGS_ID)
                .orElseGet(() -> {
                    ExperienceSettings settings = new ExperienceSettings();

                    settings.setId(SETTINGS_ID);

                    return repository.save(settings);
                });
    }

    @Transactional
    public ExperienceSettings updateSettings(
            ExperienceSettings updatedSettings) {

        ExperienceSettings settings = getSettings();

        if (updatedSettings.getEyebrow() != null) {
            settings.setEyebrow(
                    updatedSettings.getEyebrow().trim());
        }

        if (updatedSettings.getTitle() != null) {
            settings.setTitle(
                    updatedSettings.getTitle().trim());
        }

        if (updatedSettings.getDescription() != null) {
            settings.setDescription(
                    updatedSettings.getDescription().trim());
        }

        return repository.save(settings);
    }
}