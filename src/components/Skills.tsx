import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Database,
  Layers,
  Server,
  Wrench,
  LucideIcon,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

interface SkillGroup {
  id: number;
  title: string;
  icon?: string;
  skills: string[];
}

interface SkillSectionContent {
  id?: number;
  heading: string;
  subtitle: string;
}

const API_BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/skills`;

const iconMap: Record<string, LucideIcon> = {
  Code,
  Database,
  Layers,
  Server,
  Wrench,
};

const getIcon = (iconName?: string): LucideIcon => {
  if (!iconName) return Code;

  return iconMap[iconName] ?? Code;
};

const Skills = () => {
  const [groups, setGroups] = useState<SkillGroup[]>([]);
  const [content, setContent] = useState<SkillSectionContent>({
    heading: "My Tech Stack",
    subtitle: "Tools and technologies used to build modern applications.",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        setError("");

        const [skillsResponse, contentResponse] = await Promise.all([
          fetch(API_BASE_URL),
          fetch(`${API_BASE_URL}/content`),
        ]);

        if (!skillsResponse.ok) {
          throw new Error(
            `Failed to load skills (${skillsResponse.status})`
          );
        }

        if (!contentResponse.ok) {
          throw new Error(
            `Failed to load section content (${contentResponse.status})`
          );
        }

        const skillsData: SkillGroup[] = await skillsResponse.json();
        const contentData: SkillSectionContent =
          await contentResponse.json();

        setGroups(Array.isArray(skillsData) ? skillsData : []);

        setContent({
          heading: contentData.heading || "My Tech Stack",
          subtitle:
            contentData.subtitle ||
            "Tools and technologies used to build modern applications.",
        });
      } catch (err) {
        console.error("Error loading skills:", err);
        setError(
          "Unable to load skills. Please check your backend connection."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section id="skills" className="section-padding">
      <div className="w-full max-w-[100%] mx-auto px-3 sm:px-6">
        <SectionHeading
          eyebrow="Skills"
          title={content.heading}
          description={content.subtitle}
        />

        {loading ? (
          <div className="text-center py-10 text-muted-foreground">
            Loading skills...
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : groups.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            No skills added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
            {groups.map((group, index) => {
              const GroupIcon = getIcon(group.icon);

              return (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card w-full p-5 sm:p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_0_35px_hsl(var(--primary)/0.12)] group cursor-pointer overflow-hidden"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-[0_0_25px_hsl(var(--primary)/0.5)] transition-all duration-300">
                    <GroupIcon className="h-6 w-6 text-primary-foreground" />
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-lg mb-4 leading-tight">
                    {group.title}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {(group.skills || []).map((skill, skillIndex) => (
                      <span
                        key={`${group.id}-${skill}-${skillIndex}`}
                        className="px-3 py-2 rounded-lg bg-muted text-[15px] sm:text-sm text-foreground border border-border hover:border-primary/40 hover:bg-primary/10 transition-colors break-words"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;