package com.nardev.portfoliobackend.controller;

import com.nardev.portfoliobackend.model.SkillGroup;
import com.nardev.portfoliobackend.model.SkillSectionContent;
import com.nardev.portfoliobackend.service.SkillService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:8081",
        "http://localhost:3000",
        "https://my-portfolio-two-tan-81.vercel.app"
})
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    // Get all skill groups
    @GetMapping
    public ResponseEntity<List<SkillGroup>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    // Get a skill group by ID
    @GetMapping("/{id}")
    public ResponseEntity<SkillGroup> getSkillById(@PathVariable Long id) {
        return ResponseEntity.ok(skillService.getSkillById(id));
    }

    // Add a new skill group
    @PostMapping
    public ResponseEntity<SkillGroup> createSkill(
            @RequestBody SkillGroup skill) {
        SkillGroup created = skillService.createSkill(skill);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // Update a skill group
    @PutMapping("/{id}")
    public ResponseEntity<SkillGroup> updateSkill(
            @PathVariable Long id,
            @RequestBody SkillGroup skill) {
        return ResponseEntity.ok(skillService.updateSkill(id, skill));
    }

    // Delete a skill group
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
        return ResponseEntity.noContent().build();
    }

    // Get Skills section heading and subtitle
    @GetMapping("/content")
    public ResponseEntity<SkillSectionContent> getSectionContent() {
        return ResponseEntity.ok(skillService.getSectionContent());
    }

    // Update Skills section heading and subtitle
    @PutMapping("/content")
    public ResponseEntity<SkillSectionContent> updateSectionContent(
            @RequestBody SkillSectionContent content) {
        return ResponseEntity.ok(
                skillService.updateSectionContent(content));
    }
}