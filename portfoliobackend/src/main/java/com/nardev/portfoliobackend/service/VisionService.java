package com.nardev.portfoliobackend.service;

import com.nardev.portfoliobackend.model.VisionCard;
import com.nardev.portfoliobackend.model.VisionSectionContent;
import com.nardev.portfoliobackend.repository.VisionCardRepository;
import com.nardev.portfoliobackend.repository.VisionSectionContentRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VisionService {

    private final VisionSectionContentRepository contentRepository;
    private final VisionCardRepository cardRepository;

    public VisionService(
            VisionSectionContentRepository contentRepository,
            VisionCardRepository cardRepository) {
        this.contentRepository = contentRepository;
        this.cardRepository = cardRepository;
    }

    // Get section content; create defaults on first request
    @Transactional
    public VisionSectionContent getContent() {
        return contentRepository.findAll()
                .stream()
                .findFirst()
                .orElseGet(() -> {
                    VisionSectionContent content = new VisionSectionContent();

                    content.setEyebrow("My Vision");
                    content.setHeading("Building. Learning. Growing.");
                    content.setDescription(
                            "My goal is to grow as a strong Software Developer by working " +
                                    "on meaningful products, solving challenging technical problems, " +
                                    "and continuously improving my engineering skills. I am always " +
                                    "interested in learning new technologies and turning ideas into real-world applications.");
                    content.setButtonText("Let's Connect");
                    content.setButtonLink("/contact");

                    return contentRepository.save(content);
                });
    }

    @Transactional
    public VisionSectionContent updateContent(VisionSectionContent request) {
        VisionSectionContent content = getContent();

        if (request.getEyebrow() != null) {
            content.setEyebrow(request.getEyebrow());
        }

        if (request.getHeading() != null) {
            content.setHeading(request.getHeading());
        }

        if (request.getDescription() != null) {
            content.setDescription(request.getDescription());
        }

        if (request.getButtonText() != null) {
            content.setButtonText(request.getButtonText());
        }

        if (request.getButtonLink() != null) {
            content.setButtonLink(request.getButtonLink());
        }

        return contentRepository.save(content);
    }

    public List<VisionCard> getAllCards() {
        return cardRepository.findAll();
    }

    public VisionCard addCard(VisionCard card) {
        card.setId(null);
        validateCard(card);
        return cardRepository.save(card);
    }

    public VisionCard updateCard(Long id, VisionCard request) {
        VisionCard card = cardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vision card not found: " + id));

        validateCard(request);

        card.setTitle(request.getTitle());
        card.setDescription(request.getDescription());
        card.setIconSvg(request.getIconSvg());

        return cardRepository.save(card);
    }

    public void deleteCard(Long id) {
        if (!cardRepository.existsById(id)) {
            throw new IllegalArgumentException("Vision card not found: " + id);
        }

        cardRepository.deleteById(id);
    }

    private void validateCard(VisionCard card) {
        if (card.getTitle() == null || card.getTitle().isBlank()) {
            throw new IllegalArgumentException("Card title is required.");
        }

        if (card.getTitle().length() > 150) {
            throw new IllegalArgumentException("Card title must be at most 150 characters.");
        }
    }
}