package com.nardev.portfoliobackend.repository;

import com.nardev.portfoliobackend.model.SkillGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillGroupRepository extends JpaRepository<SkillGroup, Long> {
}