package com.nardev.portfoliobackend.service;

import com.nardev.portfoliobackend.model.MindsetCard;
import com.nardev.portfoliobackend.model.MindsetSectionContent;
import com.nardev.portfoliobackend.repository.MindsetCardRepository;
import com.nardev.portfoliobackend.repository.MindsetSectionContentRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MindsetService {

    private final MindsetSectionContentRepository contentRepository;
    private final MindsetCardRepository cardRepository;

    public MindsetService(
            MindsetSectionContentRepository contentRepository,
            MindsetCardRepository cardRepository) {
        this.contentRepository = contentRepository;
        this.cardRepository = cardRepository;
    }

    // Get section content; create defaults on first request
    @Transactional
    public MindsetSectionContent getContent() {
        return contentRepository.findAll()
                .stream()
                .findFirst()
                .orElseGet(() -> {
                    MindsetSectionContent content = new MindsetSectionContent();
                    content.setEyebrow("Developer Mindset");
                    content.setHeading("More Than Just Code");
                    content.setDescription(
                            "I believe good software is not only about writing code. " +
                                    "It is about understanding problems, learning continuously, " +
                                    "and creating solutions that are useful, reliable, and maintainable.");
                    return contentRepository.save(content);
                });
    }

    @Transactional
    public MindsetSectionContent updateContent(MindsetSectionContent request) {
        MindsetSectionContent content = getContent();

        if (request.getEyebrow() != null) {
            content.setEyebrow(request.getEyebrow());
        }

        if (request.getHeading() != null) {
            content.setHeading(request.getHeading());
        }

        if (request.getDescription() != null) {
            content.setDescription(request.getDescription());
        }

        return contentRepository.save(content);
    }

    public List<MindsetCard> getAllCards() {
        return cardRepository.findAll();
    }

    public MindsetCard addCard(MindsetCard card) {
        card.setId(null);
        validateCard(card);
        return cardRepository.save(card);
    }

    public MindsetCard updateCard(Long id, MindsetCard request) {
        MindsetCard card = cardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Mindset card not found: " + id));

        validateCard(request);

        card.setTitle(request.getTitle());
        card.setDescription(request.getDescription());
        card.setIconSvg(request.getIconSvg());

        return cardRepository.save(card);
    }

    public void deleteCard(Long id) {
        if (!cardRepository.existsById(id)) {
            throw new IllegalArgumentException("Mindset card not found: " + id);
        }

        cardRepository.deleteById(id);
    }

    private void validateCard(MindsetCard card) {
        if (card.getTitle() == null || card.getTitle().isBlank()) {
            throw new IllegalArgumentException("Card title is required.");
        }

        if (card.getTitle().length() > 150) {
            throw new IllegalArgumentException("Card title must be at most 150 characters.");
        }
    }
}