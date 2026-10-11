package com.nardev.portfoliobackend.controller;

import com.nardev.portfoliobackend.model.MindsetCard;
import com.nardev.portfoliobackend.model.MindsetSectionContent;
import com.nardev.portfoliobackend.service.MindsetService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mindset")
public class MindsetController {

    private final MindsetService mindsetService;

    public MindsetController(MindsetService mindsetService) {
        this.mindsetService = mindsetService;
    }

    @GetMapping
    public ResponseEntity<?> getContent() {
        try {
            return ResponseEntity.ok(Map.of(
                    "content", mindsetService.getContent(),
                    "cards", mindsetService.getAllCards()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    Map.of("message", "Failed to retrieve Mindset content."));
        }
    }

    @PutMapping
    public ResponseEntity<?> updateContent(
            @RequestBody MindsetSectionContent request) {
        try {
            return ResponseEntity.ok(mindsetService.updateContent(request));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    Map.of("message", "Failed to update Mindset content."));
        }
    }

    @GetMapping("/cards")
    public ResponseEntity<List<MindsetCard>> getCards() {
        return ResponseEntity.ok(mindsetService.getAllCards());
    }

    @PostMapping("/cards")
    public ResponseEntity<?> addCard(@RequestBody MindsetCard card) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(mindsetService.addCard(card));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/cards/{id}")
    public ResponseEntity<?> updateCard(
            @PathVariable Long id,
            @RequestBody MindsetCard card) {
        try {
            return ResponseEntity.ok(mindsetService.updateCard(id, card));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/cards/{id}")
    public ResponseEntity<?> deleteCard(@PathVariable Long id) {
        try {
            mindsetService.deleteCard(id);
            return ResponseEntity.ok(
                    Map.of("message", "Mindset card deleted successfully."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    Map.of("message", e.getMessage()));
        }
    }
}