package com.nardev.portfoliobackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "home_content")
public class HomeContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Hero image
    @Lob
    @Column(name = "hero_image", columnDefinition = "LONGBLOB")
    private byte[] heroImage;

    @Column(name = "hero_image_name")
    private String heroImageName;

    @Column(name = "hero_image_type")
    private String heroImageType;

    // Hero section
    @Column(name = "hero_title", length = 255)
    private String heroTitle;

    @Column(name = "hero_role", length = 255)
    private String heroRole;

    @Column(name = "hero_description", columnDefinition = "TEXT")
    private String heroDescription;

    // About section heading and introduction
    @Column(name = "about_eyebrow", length = 255)
    private String aboutEyebrow;

    @Column(name = "about_title", length = 255)
    private String aboutTitle;

    @Column(name = "about_subtitle", columnDefinition = "TEXT")
    private String aboutSubtitle;

    @Column(name = "about_heading", columnDefinition = "TEXT")
    private String aboutHeading;

    // Paragraphs are stored separately so each can be edited from Dashboard.
    @Column(name = "about_paragraph_1", columnDefinition = "TEXT")
    private String aboutParagraph1;

    @Column(name = "about_paragraph_2", columnDefinition = "TEXT")
    private String aboutParagraph2;

    @Column(name = "about_paragraph_3", columnDefinition = "TEXT")
    private String aboutParagraph3;

    @Column(name = "about_paragraph_4", columnDefinition = "TEXT")
    private String aboutParagraph4;

    // Keep the legacy field for compatibility with existing API/database clients.
    @Column(name = "about_description", columnDefinition = "TEXT")
    private String aboutDescription;

    // Resume and social links
    @Column(name = "resume_url", length = 500)
    private String resumeUrl;

    @Column(name = "linkedin", length = 500)
    private String linkedin;

    @Column(name = "github", length = 500)
    private String github;

    @Column(name = "instagram", length = 500)
    private String instagram;

    public HomeContent() {
    }

    public Long getId() {
        return id;
    }

    public byte[] getHeroImage() {
        return heroImage;
    }

    public void setHeroImage(byte[] heroImage) {
        this.heroImage = heroImage;
    }

    public String getHeroImageName() {
        return heroImageName;
    }

    public void setHeroImageName(String heroImageName) {
        this.heroImageName = heroImageName;
    }

    public String getHeroImageType() {
        return heroImageType;
    }

    public void setHeroImageType(String heroImageType) {
        this.heroImageType = heroImageType;
    }

    public String getHeroTitle() {
        return heroTitle;
    }

    public void setHeroTitle(String heroTitle) {
        this.heroTitle = heroTitle;
    }

    public String getHeroRole() {
        return heroRole;
    }

    public void setHeroRole(String heroRole) {
        this.heroRole = heroRole;
    }

    public String getHeroDescription() {
        return heroDescription;
    }

    public void setHeroDescription(String heroDescription) {
        this.heroDescription = heroDescription;
    }

    public String getAboutEyebrow() {
        return aboutEyebrow;
    }

    public void setAboutEyebrow(String aboutEyebrow) {
        this.aboutEyebrow = aboutEyebrow;
    }

    public String getAboutTitle() {
        return aboutTitle;
    }

    public void setAboutTitle(String aboutTitle) {
        this.aboutTitle = aboutTitle;
    }

    public String getAboutSubtitle() {
        return aboutSubtitle;
    }

    public void setAboutSubtitle(String aboutSubtitle) {
        this.aboutSubtitle = aboutSubtitle;
    }

    public String getAboutHeading() {
        return aboutHeading;
    }

    public void setAboutHeading(String aboutHeading) {
        this.aboutHeading = aboutHeading;
    }

    public String getAboutParagraph1() {
        return aboutParagraph1;
    }

    public void setAboutParagraph1(String aboutParagraph1) {
        this.aboutParagraph1 = aboutParagraph1;
    }

    public String getAboutParagraph2() {
        return aboutParagraph2;
    }

    public void setAboutParagraph2(String aboutParagraph2) {
        this.aboutParagraph2 = aboutParagraph2;
    }

    public String getAboutParagraph3() {
        return aboutParagraph3;
    }

    public void setAboutParagraph3(String aboutParagraph3) {
        this.aboutParagraph3 = aboutParagraph3;
    }

    public String getAboutParagraph4() {
        return aboutParagraph4;
    }

    public void setAboutParagraph4(String aboutParagraph4) {
        this.aboutParagraph4 = aboutParagraph4;
    }

    public String getAboutDescription() {
        return aboutDescription;
    }

    public void setAboutDescription(String aboutDescription) {
        this.aboutDescription = aboutDescription;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }

    public String getLinkedin() {
        return linkedin;
    }

    public void setLinkedin(String linkedin) {
        this.linkedin = linkedin;
    }

    public String getGithub() {
        return github;
    }

    public void setGithub(String github) {
        this.github = github;
    }

    public String getInstagram() {
        return instagram;
    }

    public void setInstagram(String instagram) {
        this.instagram = instagram;
    }
}
