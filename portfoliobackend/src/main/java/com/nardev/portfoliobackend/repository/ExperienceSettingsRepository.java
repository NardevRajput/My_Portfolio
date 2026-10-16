package com.nardev.portfoliobackend.repository;

import com.nardev.portfoliobackend.model.ExperienceSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienceSettingsRepository
        extends JpaRepository<ExperienceSettings, Long> {
}