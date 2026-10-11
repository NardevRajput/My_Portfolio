package com.nardev.portfoliobackend.repository;

import com.nardev.portfoliobackend.model.ApplicationItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationItemRepository
        extends JpaRepository<ApplicationItem, Long> {
}