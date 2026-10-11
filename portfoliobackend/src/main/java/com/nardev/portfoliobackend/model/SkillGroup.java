package com.nardev.portfoliobackend.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "skill_groups")
public class SkillGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String icon;

    @ElementCollection
    @CollectionTable(name = "skill_group_technologies", joinColumns = @JoinColumn(name = "skill_group_id"))
    @Column(name = "technology", nullable = false)
    private List<String> skills = new ArrayList<>();

    public SkillGroup() {
    }

    public SkillGroup(String title, String icon, List<String> skills) {
        this.title = title;
        this.icon = icon;
        this.skills = skills != null ? skills : new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills != null ? skills : new ArrayList<>();
    }
}