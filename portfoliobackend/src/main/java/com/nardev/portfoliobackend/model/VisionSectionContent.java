package com.nardev.portfoliobackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "vision_section_content")
public class VisionSectionContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 150)
    private String eyebrow = "My Vision";

    @Column(length = 250)
    private String heading = "Building. Learning. Growing.";

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 100)
    private String buttonText = "Let's Connect";

    @Column(length = 500)
    private String buttonLink = "/contact";

    public VisionSectionContent() {
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

    public String getButtonText() {
        return buttonText;
    }

    public void setButtonText(String buttonText) {
        this.buttonText = buttonText;
    }

    public String getButtonLink() {
        return buttonLink;
    }

    public void setButtonLink(String buttonLink) {
        this.buttonLink = buttonLink;
    }
}