package com.nardev.portfoliobackend.repository;

import com.nardev.portfoliobackend.model.ProjectItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectItemRepository extends JpaRepository<ProjectItem, Long> {
}