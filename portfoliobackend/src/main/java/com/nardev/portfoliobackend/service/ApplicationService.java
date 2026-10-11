package com.nardev.portfoliobackend.service;

import com.nardev.portfoliobackend.model.ApplicationItem;
import com.nardev.portfoliobackend.model.ApplicationSectionContent;

import com.nardev.portfoliobackend.repository.ApplicationItemRepository;
import com.nardev.portfoliobackend.repository.ApplicationSectionContentRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationItemRepository applicationRepository;
    private final ApplicationSectionContentRepository sectionRepository;

    public ApplicationService(
            ApplicationItemRepository applicationRepository,
            ApplicationSectionContentRepository sectionRepository) {

        this.applicationRepository = applicationRepository;
        this.sectionRepository = sectionRepository;
    }

    // Get all applications
    public List<ApplicationItem> getAllApplications() {
        return applicationRepository.findAll();
    }

    // Get application by ID
    public ApplicationItem getApplicationById(Long id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found with ID: " + id));
    }

    // Add application
    public ApplicationItem createApplication(ApplicationItem application) {
        application.setId(null);
        return applicationRepository.save(application);
    }

    // Update application
    public ApplicationItem updateApplication(
            Long id,
            ApplicationItem updatedApplication) {

        ApplicationItem existing = getApplicationById(id);

        existing.setTitle(updatedApplication.getTitle());
        existing.setDescription(updatedApplication.getDescription());
        existing.setIcon(updatedApplication.getIcon());
        existing.setImageUrl(updatedApplication.getImageUrl());
        existing.setAndroidUrl(updatedApplication.getAndroidUrl());
        existing.setWindowsUrl(updatedApplication.getWindowsUrl());

        return applicationRepository.save(existing);
    }

    // Delete application
    public void deleteApplication(Long id) {
        ApplicationItem application = getApplicationById(id);
        applicationRepository.delete(application);
    }

    // Get section content; create default record if missing
    @Transactional
    public ApplicationSectionContent getSectionContent() {

        return sectionRepository.findAll()
                .stream()
                .findFirst()
                .orElseGet(() -> {
                    ApplicationSectionContent content = new ApplicationSectionContent();

                    content.setEyebrow("APPLICATIONS");
                    content.setHeading("My Applications");
                    content.setSubtitle(
                            "Software applications and systems I have built or worked on.");
                    content.setSectionHeading("Applications");
                    content.setSectionSubtitle(
                            "Download my apps for Android and Windows");

                    return sectionRepository.save(content);
                });
    }

    // Update section headings
    @Transactional
    public ApplicationSectionContent updateSectionContent(
            ApplicationSectionContent updatedContent) {

        ApplicationSectionContent existing = getSectionContent();

        existing.setEyebrow(updatedContent.getEyebrow());
        existing.setHeading(updatedContent.getHeading());
        existing.setSubtitle(updatedContent.getSubtitle());
        existing.setSectionHeading(updatedContent.getSectionHeading());
        existing.setSectionSubtitle(updatedContent.getSectionSubtitle());

        return sectionRepository.save(existing);
    }
}