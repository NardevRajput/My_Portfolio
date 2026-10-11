package com.nardev.portfoliobackend.repository;

import com.nardev.portfoliobackend.model.VisionCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisionCardRepository
        extends JpaRepository<VisionCard, Long> {
}