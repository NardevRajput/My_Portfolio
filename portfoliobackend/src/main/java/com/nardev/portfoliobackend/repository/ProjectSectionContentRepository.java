package com.nardev.portfoliobackend.repository;

import com.nardev.portfoliobackend.model.ProjectSectionContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectSectionContentRepository
        extends JpaRepository<ProjectSectionContent, Long> {
}