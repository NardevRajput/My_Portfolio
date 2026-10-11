package com.nardev.portfoliobackend.service;

import com.nardev.portfoliobackend.model.AboutCard;
import com.nardev.portfoliobackend.repository.AboutCardRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AboutCardService {

    private final AboutCardRepository aboutCardRepository;

    public AboutCardService(AboutCardRepository aboutCardRepository) {
        this.aboutCardRepository = aboutCardRepository;
    }

    // Get all About cards
    public List<AboutCard> getAllCards() {
        return aboutCardRepository.findAll();
    }

    // Get one card by ID
    public AboutCard getCardById(Long id) {
        return aboutCardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(
                        "About card not found with ID: " + id));
    }

    // Add a new About card
    public AboutCard createCard(AboutCard card) {
        validateCard(card);

        card.setTitle(card.getTitle().trim());

        if (card.getDescription() != null) {
            card.setDescription(card.getDescription().trim());
        }

        if (card.getIcon() != null) {
            card.setIcon(card.getIcon().trim());
        }

        return aboutCardRepository.save(card);
    }

    // Update an existing About card
    public AboutCard updateCard(Long id, AboutCard request) {
        validateCard(request);

        AboutCard existing = getCardById(id);

        existing.setTitle(request.getTitle().trim());
        existing.setDescription(
                request.getDescription() == null
                        ? ""
                        : request.getDescription().trim());
        existing.setIcon(
                request.getIcon() == null
                        ? ""
                        : request.getIcon().trim());

        return aboutCardRepository.save(existing);
    }

    // Delete a card
    @Transactional
    public void deleteCard(Long id) {
        AboutCard existing = getCardById(id);
        aboutCardRepository.delete(existing);
    }

    // Validate incoming card data
    private void validateCard(AboutCard card) {
        if (card == null) {
            throw new IllegalArgumentException(
                    "About card data cannot be empty.");
        }

        if (card.getTitle() == null ||
                card.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException(
                    "Card title is required.");
        }

        if (card.getTitle().trim().length() > 255) {
            throw new IllegalArgumentException(
                    "Card title cannot exceed 255 characters.");
        }

        if (card.getIcon() != null &&
                card.getIcon().length() > 100) {
            throw new IllegalArgumentException(
                    "Icon name cannot exceed 100 characters.");
        }
    }
}