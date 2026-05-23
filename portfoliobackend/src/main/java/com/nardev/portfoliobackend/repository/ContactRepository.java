package com.nardev.portfoliobackend.repository;

import com.nardev.portfoliobackend.model.Contact;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository
                extends JpaRepository<Contact, Integer> {
}
