package com.nardev.portfoliobackend.controller;

import com.nardev.portfoliobackend.model.HomeContent;
import com.nardev.portfoliobackend.service.HomeContentService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/home")
public class HomeController {

    private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

    private final HomeContentService homeContentService;

    public HomeController(HomeContentService homeContentService) {
        this.homeContentService = homeContentService;
    }

    // Check whether the Home API is running
    @GetMapping("/status")
    public ResponseEntity<String> status() {
        return ResponseEntity.ok("Home API is working");
    }

    // Get Home Page text content
    @GetMapping("/content")
    public ResponseEntity<HomeContent> getHomeContent() {

        try {
            HomeContent content = homeContentService.getHomeContent();

            // Do not expose image bytes through the text-content API.
            content.setHeroImage(null);

            return ResponseEntity.ok(content);

        } catch (Exception e) {

            logger.error("Failed to retrieve Home Page content.", e);

            return ResponseEntity.internalServerError().build();
        }
    }

    // Save or update Home Page text content
    @PutMapping(value = "/content", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> saveHomeContent(
            @RequestBody HomeContent request) {

        try {
            HomeContent savedContent = homeContentService.saveHomeContent(request);

            logger.info("Home Page text content saved successfully.");

            return ResponseEntity.ok(
                    Map.of(
                            "success", true,
                            "message", "Home Page content saved successfully.",
                            "data", Map.of(
                                    "id", savedContent.getId())));

        } catch (IllegalArgumentException e) {

            return ResponseEntity.badRequest().body(
                    Map.of(
                            "success", false,
                            "message", e.getMessage()));

        } catch (Exception e) {

            logger.error("Failed to save Home Page content.", e);

            return ResponseEntity.internalServerError().body(
                    Map.of(
                            "success", false,
                            "message", "Failed to save Home Page content."));
        }
    }

    // Upload or update the Hero image
    @PutMapping(value = "/hero-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> uploadHeroImage(
            @RequestParam("image") MultipartFile image) {

        try {
            if (image == null || image.isEmpty()) {
                return ResponseEntity.badRequest().body(
                        Map.of(
                                "success", false,
                                "message", "Please select an image."));
            }

            logger.info(
                    "Hero image upload requested: name={}, size={} bytes, contentType={}",
                    image.getOriginalFilename(),
                    image.getSize(),
                    image.getContentType());

            homeContentService.saveHeroImage(image);

            logger.info("Hero image saved successfully.");

            return ResponseEntity.ok(
                    Map.of(
                            "success", true,
                            "message", "Hero image updated successfully."));

        } catch (IllegalArgumentException e) {

            logger.warn(
                    "Hero image validation failed: {}",
                    e.getMessage());

            return ResponseEntity.badRequest().body(
                    Map.of(
                            "success", false,
                            "message", e.getMessage()));

        } catch (Exception e) {

            logger.error("Failed to upload Hero image.", e);

            return ResponseEntity.internalServerError().body(
                    Map.of(
                            "success", false,
                            "message", "Failed to upload Hero image. Check backend logs."));
        }
    }

    // Public endpoint to display the saved Hero image
    @GetMapping("/hero-image")
    public ResponseEntity<byte[]> getHeroImage() {

        try {
            byte[] image = homeContentService.getHeroImage();
            String imageType = homeContentService.getHeroImageType();

            if (image == null || image.length == 0) {
                return ResponseEntity.notFound().build();
            }

            MediaType mediaType;

            try {
                mediaType = MediaType.parseMediaType(imageType);
            } catch (Exception e) {

                logger.warn(
                        "Invalid saved Hero image content type: {}",
                        imageType);

                mediaType = MediaType.APPLICATION_OCTET_STREAM;
            }

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.CACHE_CONTROL,
                            "no-cache, no-store, must-revalidate")
                    .header(HttpHeaders.PRAGMA, "no-cache")
                    .header(HttpHeaders.EXPIRES, "0")
                    .contentType(mediaType)
                    .body(image);

        } catch (Exception e) {

            logger.error("Failed to retrieve Hero image.", e);

            return ResponseEntity.internalServerError().build();
        }
    }

    // Delete the saved Hero image
    @DeleteMapping("/hero-image")
    public ResponseEntity<Map<String, Object>> deleteHeroImage() {

        try {
            homeContentService.deleteHeroImage();

            logger.info("Hero image deleted successfully.");

            return ResponseEntity.ok(
                    Map.of(
                            "success", true,
                            "message", "Hero image deleted successfully."));

        } catch (Exception e) {

            logger.error("Failed to delete Hero image.", e);

            return ResponseEntity.internalServerError().body(
                    Map.of(
                            "success", false,
                            "message", "Failed to delete Hero image."));
        }
    }
}