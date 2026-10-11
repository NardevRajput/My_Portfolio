package com.nardev.portfoliobackend.controller;

import com.nardev.portfoliobackend.model.ServiceItem;
import com.nardev.portfoliobackend.model.ServiceSectionContent;
import com.nardev.portfoliobackend.service.ServiceService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:8081",
        "http://localhost:3000"
})
public class ServiceController {

    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    // Get all services
    @GetMapping
    public ResponseEntity<List<ServiceItem>> getAllServices() {
        return ResponseEntity.ok(serviceService.getAllServices());
    }

    // Get service by ID
    @GetMapping("/{id}")
    public ResponseEntity<ServiceItem> getServiceById(
            @PathVariable Long id) {
        return ResponseEntity.ok(serviceService.getServiceById(id));
    }

    // Add service
    @PostMapping
    public ResponseEntity<ServiceItem> createService(
            @RequestBody ServiceItem service) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(serviceService.createService(service));
    }

    // Update service
    @PutMapping("/{id}")
    public ResponseEntity<ServiceItem> updateService(
            @PathVariable Long id,
            @RequestBody ServiceItem service) {
        return ResponseEntity.ok(
                serviceService.updateService(id, service));
    }

    // Delete service
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(
            @PathVariable Long id) {
        serviceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }

    // Get section heading and subtitle
    @GetMapping("/content")
    public ResponseEntity<ServiceSectionContent> getSectionContent() {
        return ResponseEntity.ok(
                serviceService.getSectionContent());
    }

    // Update section heading and subtitle
    @PutMapping("/content")
    public ResponseEntity<ServiceSectionContent> updateSectionContent(
            @RequestBody ServiceSectionContent content) {
        return ResponseEntity.ok(
                serviceService.updateSectionContent(content));
    }
}