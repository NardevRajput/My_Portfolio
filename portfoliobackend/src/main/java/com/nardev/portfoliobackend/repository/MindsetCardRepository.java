package com.nardev.portfoliobackend.repository;

import com.nardev.portfoliobackend.model.MindsetCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MindsetCardRepository
        extends JpaRepository<MindsetCard, Long> {
}