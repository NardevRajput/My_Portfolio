package com.nardev.portfoliobackend.repository;

import com.nardev.portfoliobackend.model.ServiceSectionContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceSectionContentRepository
        extends JpaRepository<ServiceSectionContent, Long> {
}