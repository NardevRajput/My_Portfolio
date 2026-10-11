package com.nardev.portfoliobackend.repository;

import com.nardev.portfoliobackend.model.SkillSectionContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillSectionContentRepository
                extends JpaRepository<SkillSectionContent, Long> {
}