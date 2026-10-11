package com.nardev.portfoliobackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "mindset_section_content")
public class MindsetSectionContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 150)
    private String eyebrow = "Developer Mindset";

    @Column(length = 250)
    private String heading = "More Than Just Code";

    @Column(columnDefinition = "TEXT")
    private String description;

    public MindsetSectionContent() {
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

    public String getHeading() {
        return heading;
    }

    public void setHeading(String heading) {
        this.heading = heading;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}