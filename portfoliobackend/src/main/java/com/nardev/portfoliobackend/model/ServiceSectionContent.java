package com.nardev.portfoliobackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "service_section_content")
public class ServiceSectionContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String heading = "What I Offer";

    @Column(columnDefinition = "TEXT")
    private String subtitle = "Solutions I deliver to bring your ideas to life.";

    public ServiceSectionContent() {
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