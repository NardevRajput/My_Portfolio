package com.nardev.portfoliobackend.controller;

import com.nardev.portfoliobackend.model.VisionCard;
import com.nardev.portfoliobackend.model.VisionSectionContent;
import com.nardev.portfoliobackend.service.VisionService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/vision")
public class VisionController {

    private final VisionService visionService;

    public VisionController(VisionService visionService) {
        this.visionService = visionService;
    }

    @GetMapping
    public ResponseEntity<?> getContent() {
        try {
            return ResponseEntity.ok(Map.of(
                    "content", visionService.getContent(),
                    "cards", visionService.getAllCards()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    Map.of("message", "Failed to retrieve Vision content."));
        }
    }

    @PutMapping
    public ResponseEntity<?> updateContent(
            @RequestBody VisionSectionContent request) {
        try {
            return ResponseEntity.ok(visionService.updateContent(request));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    Map.of("message", "Failed to update Vision content."));
        }
    }

    @GetMapping("/cards")
    public ResponseEntity<List<VisionCard>> getCards() {
        return ResponseEntity.ok(visionService.getAllCards());
    }

    @PostMapping("/cards")
    public ResponseEntity<?> addCard(@RequestBody VisionCard card) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(visionService.addCard(card));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/cards/{id}")
    public ResponseEntity<?> updateCard(
            @PathVariable Long id,
            @RequestBody VisionCard card) {
        try {
            return ResponseEntity.ok(visionService.updateCard(id, card));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/cards/{id}")
    public ResponseEntity<?> deleteCard(@PathVariable Long id) {
        try {
            visionService.deleteCard(id);
            return ResponseEntity.ok(
                    Map.of("message", "Vision card deleted successfully."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    Map.of("message", e.getMessage()));
        }
    }
}