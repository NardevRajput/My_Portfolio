import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  FileText,
  Github,
  LayoutDashboard,
  ShoppingBag,
  Zap,
  Code2,
  BookOpen,
  ShieldCheck,
  BriefcaseBusiness,
} from "lucide-react";

import SectionHeading from "./SectionHeading";
import { Button } from "@/components/ui/button";

/* =========================================================
   PROJECTS
========================================================= */

type ProjectApiItem = {
  id: number;
  title: string;
  category?: string;
  status?: string;
  description?: string;
  progress?: number;
  tech?: string[];
  features?: string[];
  github?: string;
  buttonText?: string;
};

type ProjectCardItem = {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tag: string;
  status: string;
  desc: string;
  tech: string[];
  features: string[];
  github: string;
  progress?: number;
  buttonText?: string;
};

type ProjectSectionApi = {
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
};

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8080").replace(/\/$/, "");

const getProjectIcon = (category?: string, title?: string) => {
  const value = `${category || ""} ${title || ""}`.toLowerCase();
  if (value.includes("ai") || value.includes("ml") || value.includes("phishing")) return ShieldCheck;
  if (value.includes("pdf")) return FileText;
  if (value.includes("booking") || value.includes("business")) return BriefcaseBusiness;
  if (value.includes("blog") || value.includes("book")) return BookOpen;
  if (value.includes("e-commerce") || value.includes("shopping") || value.includes("store")) return ShoppingBag;
  if (value.includes("real-time") || value.includes("interactive")) return Zap;
  return LayoutDashboard;
};

/* =========================================================
   REUSABLE PROJECT CARD
========================================================= */

const ProjectCard = ({ item, index }: { item: ProjectCardItem; index: number }) => {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
      }}
      className="
        glass-card
        w-full
        p-5
        sm:p-7
        rounded-2xl
        hover:border-primary/40
        hover:-translate-y-2
        hover:shadow-[0_0_35px_rgba(255,115,0,0.15)]
        duration-300
        transition-all
        group
        relative
        overflow-hidden
      "
    >
      {/* =================================================
          GLOW
      ================================================= */}

      <div
        className="
          absolute
          -bottom-10
          -right-10
          w-40
          h-40
          rounded-full
          bg-secondary/10
          blur-2xl
          group-hover:bg-secondary/20
          transition-all
        "
      />

      <div className="relative z-10">

        {/* =================================================
            TOP SECTION
        ================================================= */}

        <div className="flex flex-wrap items-start gap-4 mb-5">

          {/* ICON */}

          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-gradient-accent
              flex
              items-center
              justify-center
              shadow-[var(--shadow-elegant)]
              shrink-0
              group-hover:scale-110
              transition-transform
              duration-300
            "
          >
            <Icon className="h-7 w-7 text-primary-foreground" />
          </div>

          {/* TAGS */}

          <div className="flex flex-wrap gap-2">

            <span
              className="
                px-3
                py-1
                rounded-full
                bg-primary/15
                text-primary
                text-xs
                font-semibold
              "
            >
              {item.tag}
            </span>

            <span
              className={`
                px-3
                py-1
                rounded-full
                text-xs
                font-semibold
                ${
                  item.status === "Completed"
                    ? "bg-blue-500/20 text-blue-400"
                    : item.status === "In Progress"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }
              `}
            >
              {item.status}
            </span>

          </div>
        </div>

        {/* =================================================
            PROGRESS BAR
        ================================================= */}

        <div className="w-full h-1.5 bg-muted rounded-full mb-5 overflow-hidden">
          <div
            className={`
              h-full
              rounded-full
              ${
                item.status === "Completed"
                  ? "w-full bg-blue-400"
                  : item.status === "In Progress"
                  ? "w-[70%] bg-green-400"
                  : "w-[35%] bg-yellow-400"
              }
            `}
          />
        </div>

        {/* =================================================
            TITLE
        ================================================= */}

        <h3
          className="
            font-display
            font-bold
            text-2xl
            sm:text-xl
            leading-tight
            mb-3
          "
        >
          {item.title}
        </h3>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <p
          className="
            text-muted-foreground
            text-[16px]
            sm:text-sm
            leading-relaxed
            mb-5
          "
        >
          {item.desc}
        </p>

        {/* =================================================
            FEATURES
        ================================================= */}

        <ul
          className="
            space-y-3
            text-[16px]
            sm:text-sm
            text-muted-foreground
            mb-6
            leading-relaxed
          "
        >
          {item.features.map((feature) => (
            <li key={feature}>
              • {feature}
            </li>
          ))}
        </ul>

        {/* =================================================
            TECH STACK
        ================================================= */}

        <div className="flex flex-wrap gap-2 mb-6">

          {item.tech.map((tech) => (
            <span
              key={tech}
              className="
                text-[14px]
                sm:text-xs
                px-3
                py-2
                rounded-xl
                bg-muted
                border
                border-border
                text-muted-foreground
              "
            >
              {tech}
            </span>
          ))}

        </div>

        {/* =================================================
            BUTTONS
        ================================================= */}

        <div className="flex flex-col sm:flex-row gap-3 w-full">

          {/* CODE BUTTON */}

          <Button
            size="sm"
            variant="outline"
            className="
              border-primary/30
              hover:bg-primary/10
              hover:scale-105
              transition-all
              w-full
              sm:w-auto
            "
            asChild
          >
            <a
              href={item.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4 mr-2" />
              Code
            </a>
          </Button>

          {/* STATUS BUTTON */}

          <Button
            size="sm"
            className="
              bg-gradient-primary
              hover:opacity-90
              w-full
              sm:w-auto
              text-sm
              cursor-default
            "
          >
            {item.buttonText || (item.status === "Completed"
              ? "Completed"
              : "Under Development")}
          </Button>

        </div>

      </div>
    </motion.div>
  );
};

/* =========================================================
   MAIN PROJECTS COMPONENT
========================================================= */

const Projects = () => {
  const [projects, setProjects] = useState<ProjectCardItem[]>([]);
  const [sectionContent, setSectionContent] = useState({
    eyebrow: "Portfolio",
    heading: "Featured Projects",
    subtitle: "A selection of things I've designed and built.",
  });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;

    const loadProjects = async () => {
      try {
        setLoading(true);
        setLoadError("");

        const [projectsResponse, sectionResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/projects`),
          fetch(`${API_BASE_URL}/api/projects/section`),
        ]);

        if (!projectsResponse.ok) {
          throw new Error(`Projects API returned ${projectsResponse.status}`);
        }

        const projectData: ProjectApiItem[] = await projectsResponse.json();
        const sectionData: ProjectSectionApi | null = sectionResponse.ok
          ? await sectionResponse.json()
          : null;

        if (!active) return;

        setProjects((Array.isArray(projectData) ? projectData : []).map((project) => ({
          id: project.id,
          icon: getProjectIcon(project.category, project.title),
          title: project.title || "Untitled Project",
          tag: project.category || "Project",
          status: project.status || "Research Phase",
          desc: project.description || "",
          tech: Array.isArray(project.tech) ? project.tech : [],
          features: Array.isArray(project.features) ? project.features : [],
          github: project.github || "",
          progress: project.progress,
          buttonText: project.buttonText,
        })));

        if (sectionData) {
          setSectionContent({
            eyebrow: sectionData.eyebrow || "Portfolio",
            heading: sectionData.heading || "Featured Projects",
            subtitle: sectionData.subtitle || "A selection of things I've designed and built.",
          });
        }
      } catch (error) {
        console.error("Unable to load projects from backend:", error);
        if (active) setLoadError("Projects could not be loaded. Please check the backend connection.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadProjects();
    return () => { active = false; };
  }, []);

  return (
    <section id="projects" className="section-padding">
      <div className="w-full max-w-[100%] mx-auto px-3 sm:px-6">
        <SectionHeading
          eyebrow={sectionContent.eyebrow}
          title={sectionContent.heading}
          description={sectionContent.subtitle}
        />

        {loading ? (
          <p className="text-center text-muted-foreground py-10">Loading projects...</p>
        ) : loadError ? (
          <p className="text-center text-muted-foreground py-10">{loadError}</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-muted-foreground py-10">No projects have been added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <ProjectCard key={project.id ?? `project-${project.title}`} item={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;