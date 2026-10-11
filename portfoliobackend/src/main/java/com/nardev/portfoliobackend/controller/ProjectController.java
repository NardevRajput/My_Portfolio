package com.nardev.portfoliobackend.controller;

import com.nardev.portfoliobackend.model.ProjectItem;
import com.nardev.portfoliobackend.model.ProjectSectionContent;
import com.nardev.portfoliobackend.repository.ProjectItemRepository;
import com.nardev.portfoliobackend.repository.ProjectSectionContentRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = {
        "http://localhost:8081",
        "http://localhost:5173"
})
public class ProjectController {

    private final ProjectItemRepository projectItemRepository;
    private final ProjectSectionContentRepository sectionContentRepository;

    public ProjectController(
            ProjectItemRepository projectItemRepository,
            ProjectSectionContentRepository sectionContentRepository) {

        this.projectItemRepository = projectItemRepository;
        this.sectionContentRepository = sectionContentRepository;
    }

    // =========================================
    // PUBLIC API: Get all projects
    // =========================================
    @GetMapping
    public ResponseEntity<List<ProjectItem>> getAllProjects() {
        return ResponseEntity.ok(projectItemRepository.findAll());
    }

    // =========================================
    // PUBLIC API: Get section headings
    // =========================================
    @GetMapping("/section")
    public ResponseEntity<ProjectSectionContent> getSectionContent() {

        ProjectSectionContent content = sectionContentRepository.findAll()
                .stream()
                .findFirst()
                .orElseGet(() -> {
                    ProjectSectionContent defaultContent = new ProjectSectionContent();

                    return sectionContentRepository.save(defaultContent);
                });

        return ResponseEntity.ok(content);
    }

    // =========================================
    // ADMIN API: Add project
    // =========================================
    @PostMapping
    public ResponseEntity<ProjectItem> addProject(
            @RequestBody ProjectItem project) {

        project.setId(null);

        ProjectItem savedProject = projectItemRepository.save(project);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedProject);
    }

    // =========================================
    // ADMIN API: Update project
    // =========================================
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(
            @PathVariable Long id,
            @RequestBody ProjectItem updatedProject) {

        return projectItemRepository.findById(id)
                .map(existingProject -> {

                    existingProject.setTitle(updatedProject.getTitle());
                    existingProject.setCategory(updatedProject.getCategory());
                    existingProject.setStatus(updatedProject.getStatus());
                    existingProject.setDescription(updatedProject.getDescription());
                    existingProject.setProgress(updatedProject.getProgress());
                    existingProject.setFeatures(updatedProject.getFeatures());
                    existingProject.setTech(updatedProject.getTech());
                    existingProject.setGithub(updatedProject.getGithub());
                    existingProject.setButtonText(updatedProject.getButtonText());

                    ProjectItem savedProject = projectItemRepository.save(existingProject);

                    return ResponseEntity.ok(savedProject);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // =========================================
    // ADMIN API: Delete project
    // =========================================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(
            @PathVariable Long id) {

        if (!projectItemRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        projectItemRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }

    // =========================================
    // ADMIN API: Update section headings
    // =========================================
    @PutMapping("/section")
    public ResponseEntity<ProjectSectionContent> updateSectionContent(
            @RequestBody ProjectSectionContent updatedContent) {

        ProjectSectionContent content = sectionContentRepository.findAll()
                .stream()
                .findFirst()
                .orElseGet(ProjectSectionContent::new);

        content.setEyebrow(updatedContent.getEyebrow());
        content.setHeading(updatedContent.getHeading());
        content.setSubtitle(updatedContent.getSubtitle());

        ProjectSectionContent savedContent = sectionContentRepository.save(content);

        return ResponseEntity.ok(savedContent);
    }
}