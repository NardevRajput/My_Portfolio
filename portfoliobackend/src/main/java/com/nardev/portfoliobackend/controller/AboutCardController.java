package com.nardev.portfoliobackend.controller;

import com.nardev.portfoliobackend.model.AboutCard;
import com.nardev.portfoliobackend.service.AboutCardService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/about-cards")
@CrossOrigin(origins = {
        "http://localhost:8081",
        "http://localhost:5173",
        "https://my-portfolio-two-tan-81.vercel.app"
})
public class AboutCardController {

    private final AboutCardService aboutCardService;

    public AboutCardController(AboutCardService aboutCardService) {
        this.aboutCardService = aboutCardService;
    }

    // Get all About cards
    @GetMapping
    public ResponseEntity<List<AboutCard>> getAllCards() {
        return ResponseEntity.ok(aboutCardService.getAllCards());
    }

    // Get a single About card
    @GetMapping("/{id}")
    public ResponseEntity<?> getCardById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(aboutCardService.getCardById(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // Create a new About card
    @PostMapping
    public ResponseEntity<?> createCard(@RequestBody AboutCard card) {
        try {
            AboutCard savedCard = aboutCardService.createCard(card);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(savedCard);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // Update an existing About card
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCard(
            @PathVariable Long id,
            @RequestBody AboutCard card) {

        try {
            return ResponseEntity.ok(
                    aboutCardService.updateCard(id, card));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // Delete an About card
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCard(@PathVariable Long id) {
        try {
            aboutCardService.deleteCard(id);

            return ResponseEntity.ok(
                    Map.of("message", "About card deleted successfully."));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", e.getMessage()));
        }
    }
}