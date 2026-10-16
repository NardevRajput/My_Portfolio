package com.nardev.portfoliobackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "experience_settings")
public class ExperienceSettings {

    @Id
    private Long id = 1L;

    @Column(nullable = false)
    private String eyebrow = "Experience";

    @Column(nullable = false)
    private String title = "Where I've Worked";

    @Column(columnDefinition = "TEXT")
    private String description = "Hands-on contributions to real software products.";

    public ExperienceSettings() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEyebrow() {
        return eyebrow;
    }

    public void setEyebrow(String eyebrow) {
        this.eyebrow = eyebrow;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}