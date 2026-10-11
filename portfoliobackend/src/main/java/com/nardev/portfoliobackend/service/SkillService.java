package com.nardev.portfoliobackend.service;

import com.nardev.portfoliobackend.model.SkillGroup;
import com.nardev.portfoliobackend.model.SkillSectionContent;
import com.nardev.portfoliobackend.repository.SkillGroupRepository;
import com.nardev.portfoliobackend.repository.SkillSectionContentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SkillService {

    private final SkillGroupRepository skillGroupRepository;
    private final SkillSectionContentRepository contentRepository;

    public SkillService(
            SkillGroupRepository skillGroupRepository,
            SkillSectionContentRepository contentRepository) {
        this.skillGroupRepository = skillGroupRepository;
        this.contentRepository = contentRepository;
    }

    // Get all skill cards
    public List<SkillGroup> getAllSkills() {
        return skillGroupRepository.findAll();
    }

    // Get one skill card
    public SkillGroup getSkillById(Long id) {
        return skillGroupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill group not found with id: " + id));
    }

    // Add a new skill card
    public SkillGroup createSkill(SkillGroup skill) {
        skill.setId(null);
        return skillGroupRepository.save(skill);
    }

    // Update a skill card
    public SkillGroup updateSkill(Long id, SkillGroup updatedSkill) {
        SkillGroup existing = getSkillById(id);

        existing.setTitle(updatedSkill.getTitle());
        existing.setIcon(updatedSkill.getIcon());
        existing.setSkills(updatedSkill.getSkills());

        return skillGroupRepository.save(existing);
    }

    // Delete a skill card
    public void deleteSkill(Long id) {
        SkillGroup existing = getSkillById(id);
        skillGroupRepository.delete(existing);
    }

    // Get heading and subtitle
    public SkillSectionContent getSectionContent() {
        return contentRepository.findAll()
                .stream()
                .findFirst()
                .orElseGet(() -> contentRepository.save(
                        new SkillSectionContent(
                                "My Tech Stack",
                                "Tools and technologies used to build modern applications.")));
    }

    // Update heading and subtitle
    @Transactional
    public SkillSectionContent updateSectionContent(
            SkillSectionContent updatedContent) {

        SkillSectionContent existing = getSectionContent();

        existing.setHeading(updatedContent.getHeading());
        existing.setSubtitle(updatedContent.getSubtitle());

        return contentRepository.save(existing);
    }
}