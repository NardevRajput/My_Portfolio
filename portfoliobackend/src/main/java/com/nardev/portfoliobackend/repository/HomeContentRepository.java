package com.nardev.portfoliobackend.repository;

import com.nardev.portfoliobackend.model.HomeContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomeContentRepository extends JpaRepository<HomeContent, Long> {
}