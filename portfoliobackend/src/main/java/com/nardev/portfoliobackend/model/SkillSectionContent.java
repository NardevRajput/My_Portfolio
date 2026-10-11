package com.nardev.portfoliobackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "skill_section_content")
public class SkillSectionContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String heading = "My Tech Stack";

    @Column(columnDefinition = "TEXT")
    private String subtitle = "Tools and technologies used to build modern applications.";

    public SkillSectionContent() {
    }

    public SkillSectionContent(String heading, String subtitle) {
        this.heading = heading;
        this.subtitle = subtitle;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHeading() {
        return heading;
    }

    public void setHeading(String heading) {
        this.heading = heading;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }
}