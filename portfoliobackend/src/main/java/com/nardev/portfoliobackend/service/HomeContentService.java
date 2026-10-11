package com.nardev.portfoliobackend.service;

import com.nardev.portfoliobackend.model.HomeContent;
import com.nardev.portfoliobackend.repository.HomeContentRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Locale;

@Service
public class HomeContentService {

    private static final long MAX_IMAGE_SIZE = 5L * 1024 * 1024;

    private final HomeContentRepository homeContentRepository;

    public HomeContentService(HomeContentRepository homeContentRepository) {
        this.homeContentRepository = homeContentRepository;
    }

    public HomeContent getHomeContent() {
        return homeContentRepository.findById(1L)
                .orElseGet(() -> {
                    HomeContent content = new HomeContent();
                    return homeContentRepository.save(content);
                });
    }

    /**
     * Saves text content while preserving the currently stored hero image.
     */
    public HomeContent saveHomeContent(HomeContent request) {
        if (request == null) {
            throw new IllegalArgumentException("Home page content cannot be empty.");
        }

        HomeContent existing = getHomeContent();

        // Hero section
        existing.setHeroTitle(request.getHeroTitle());
        existing.setHeroRole(request.getHeroRole());
        existing.setHeroDescription(request.getHeroDescription());

        // About section metadata and main heading
        existing.setAboutEyebrow(request.getAboutEyebrow());
        existing.setAboutTitle(request.getAboutTitle());
        existing.setAboutSubtitle(request.getAboutSubtitle());
        existing.setAboutHeading(request.getAboutHeading());

        // Four editable About paragraphs
        existing.setAboutParagraph1(request.getAboutParagraph1());
        existing.setAboutParagraph2(request.getAboutParagraph2());
        existing.setAboutParagraph3(request.getAboutParagraph3());
        existing.setAboutParagraph4(request.getAboutParagraph4());

        // Keep legacy field for compatibility with existing frontend/code.
        existing.setAboutDescription(request.getAboutDescription());

        // Resume and social links
        existing.setResumeUrl(request.getResumeUrl());
        existing.setLinkedin(request.getLinkedin());
        existing.setGithub(request.getGithub());
        existing.setInstagram(request.getInstagram());

        // Do not modify heroImage, heroImageName, or heroImageType here.
        return homeContentRepository.save(existing);
    }

    public HomeContent saveHeroImage(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Please select an image.");
        }

        if (file.getSize() > MAX_IMAGE_SIZE) {
            throw new IllegalArgumentException("Image size must be less than or equal to 5 MB.");
        }

        String contentType = file.getContentType();
        if (contentType == null ||
                !contentType.toLowerCase(Locale.ROOT).startsWith("image/")) {
            throw new IllegalArgumentException("Only image files are allowed.");
        }

        byte[] imageBytes = file.getBytes();
        if (imageBytes.length == 0) {
            throw new IllegalArgumentException("The selected image is empty.");
        }

        HomeContent content = getHomeContent();
        content.setHeroImage(imageBytes);
        content.setHeroImageName(file.getOriginalFilename());
        content.setHeroImageType(contentType);
        return homeContentRepository.save(content);
    }

    public byte[] getHeroImage() {
        return getHomeContent().getHeroImage();
    }

    public String getHeroImageType() {
        return getHomeContent().getHeroImageType();
    }

    public void deleteHeroImage() {
        HomeContent content = getHomeContent();
        content.setHeroImage(null);
        content.setHeroImageName(null);
        content.setHeroImageType(null);
        homeContentRepository.save(content);
    }
}
