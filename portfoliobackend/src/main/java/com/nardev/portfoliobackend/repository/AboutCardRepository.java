package com.nardev.portfoliobackend.repository;

import com.nardev.portfoliobackend.model.AboutCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AboutCardRepository extends JpaRepository<AboutCard, Long> {

}