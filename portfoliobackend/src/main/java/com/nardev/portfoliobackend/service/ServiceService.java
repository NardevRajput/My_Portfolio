package com.nardev.portfoliobackend.service;

import com.nardev.portfoliobackend.model.ServiceItem;
import com.nardev.portfoliobackend.model.ServiceSectionContent;
import com.nardev.portfoliobackend.repository.ServiceItemRepository;
import com.nardev.portfoliobackend.repository.ServiceSectionContentRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ServiceService {

    private final ServiceItemRepository serviceItemRepository;
    private final ServiceSectionContentRepository contentRepository;

    public ServiceService(
            ServiceItemRepository serviceItemRepository,
            ServiceSectionContentRepository contentRepository) {
        this.serviceItemRepository = serviceItemRepository;
        this.contentRepository = contentRepository;
    }

    // Get all service cards
    public List<ServiceItem> getAllServices() {
        return serviceItemRepository.findAll();
    }

    // Get one service card
    public ServiceItem getServiceById(Long id) {
        return serviceItemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Service not found"));
    }

    // Add service card
    public ServiceItem createService(ServiceItem service) {
        service.setId(null);
        return serviceItemRepository.save(service);
    }

    // Update service card
    public ServiceItem updateService(Long id, ServiceItem updatedService) {
        ServiceItem existing = getServiceById(id);

        existing.setTitle(updatedService.getTitle());
        existing.setDescription(updatedService.getDescription());
        existing.setIcon(updatedService.getIcon());

        return serviceItemRepository.save(existing);
    }

    // Delete service card
    public void deleteService(Long id) {
        ServiceItem existing = getServiceById(id);
        serviceItemRepository.delete(existing);
    }

    // Get heading and subtitle
    @Transactional
    public ServiceSectionContent getSectionContent() {
        return contentRepository.findAll()
                .stream()
                .findFirst()
                .orElseGet(() -> {
                    ServiceSectionContent content = new ServiceSectionContent();

                    content.setHeading("What I Offer");
                    content.setSubtitle(
                            "Solutions I deliver to bring your ideas to life.");

                    return contentRepository.save(content);
                });
    }

    // Update heading and subtitle
    @Transactional
    public ServiceSectionContent updateSectionContent(
            ServiceSectionContent updatedContent) {

        ServiceSectionContent existing = getSectionContent();

        existing.setHeading(updatedContent.getHeading());
        existing.setSubtitle(updatedContent.getSubtitle());

        return contentRepository.save(existing);
    }
}