package com.nardev.portfoliobackend.repository;

import com.nardev.portfoliobackend.model.ApplicationSectionContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationSectionContentRepository
        extends JpaRepository<ApplicationSectionContent, Long> {
}