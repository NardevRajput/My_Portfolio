package com.nardev.portfoliobackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "application_section_content")
public class ApplicationSectionContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eyebrow = "APPLICATIONS";

    private String heading = "My Applications";

    @Column(columnDefinition = "TEXT")
    private String subtitle = "Software applications and systems I have built or worked on.";

    private String sectionHeading = "Applications";

    @Column(columnDefinition = "TEXT")
    private String sectionSubtitle = "Download my apps for Android and Windows";

    public ApplicationSectionContent() {
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

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public String getSectionHeading() {
        return sectionHeading;
    }

    public void setSectionHeading(String sectionHeading) {
        this.sectionHeading = sectionHeading;
    }

    public String getSectionSubtitle() {
        return sectionSubtitle;
    }

    public void setSectionSubtitle(String sectionSubtitle) {
        this.sectionSubtitle = sectionSubtitle;
    }
}