import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import SectionHeading from "./SectionHeading";

type ExperienceItem = {
  id: number;
  role: string;
  company: string;
  duration?: string;
  location?: string;
  period?: string;
  points?: string[] | string;
  description?: string;
};

type ExperienceSettings = {
  eyebrow: string;
  title: string;
  description: string;
};

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:8080"
).replace(/\/+$/, "");

const defaultSettings: ExperienceSettings = {
  eyebrow: "Experience",
  title: "Where I've Worked",
  description: "Hands-on contributions to real software products.",
};

const defaultItems: ExperienceItem[] = [
  {
    id: 1,
    role: "Full Stack Developer",
    company: "Personal Portfolio Project",
    points: [
      "Developing a modern full-stack portfolio using React, TypeScript, Spring Boot, and MySQL.",
      "Implemented JWT authentication, protected admin dashboard, REST APIs, and secure backend systems.",
      "Built contact management system with email integration, Excel export, and rate limiting security.",
    ],
  },
  {
    id: 2,
    role: "Backend Developer",
    company: "Spring Boot Practice Projects",
    points: [
      "Building scalable backend systems using Spring Boot and REST APIs.",
      "Integrated JWT authentication, CORS security, database operations, and API handling.",
      "Worked on production-style backend architecture and admin management systems.",
    ],
  },
  {
    id: 3,
    role: "AI/ML Developer",
    company: "Final Year Project",
    points: [
      "Developing an AI/ML phishing detection and prevention system.",
      "Using FastAPI, Python, and Transformer-based models for malicious URL detection.",
      "Focused on real-time phishing analysis and secure browsing protection.",
    ],
  },
];

const normalizePoints = (
  points: ExperienceItem["points"]
): string[] => {
  if (Array.isArray(points)) {
    return points
      .filter(
        (point): point is string =>
          typeof point === "string" && Boolean(point.trim())
      )
      .map((point) => point.trim());
  }

  if (typeof points === "string") {
    return points
      .split(/\r?\n/)
      .map((point) => point.replace(/^[\s•\-▹]+/, "").trim())
      .filter(Boolean);
  }

  return [];
};

const Experience = () => {
  const [items, setItems] = useState<ExperienceItem[]>(defaultItems);
  const [settings, setSettings] =
    useState<ExperienceSettings>(defaultSettings);

  useEffect(() => {
    const controller = new AbortController();

    // Load experience cards from the backend.
    const loadExperience = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/experience`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(
            `Experience request failed (${response.status})`
          );
        }

        const data: unknown = await response.json();

        if (Array.isArray(data)) {
          setItems(data as ExperienceItem[]);
        }
      } catch (error) {
        if (
          error instanceof Error &&
          error.name !== "AbortError"
        ) {
          console.error(
            "Unable to load experience records:",
            error
          );
        }
      }
    };

    // Load section heading and description from the backend.
    const loadSettings = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/experience/settings`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(
            `Experience settings request failed (${response.status})`
          );
        }

        const data =
          (await response.json()) as Partial<ExperienceSettings>;

        setSettings({
          eyebrow:
            typeof data.eyebrow === "string" &&
            data.eyebrow.trim()
              ? data.eyebrow.trim()
              : defaultSettings.eyebrow,

          title:
            typeof data.title === "string" &&
            data.title.trim()
              ? data.title.trim()
              : defaultSettings.title,

          description:
            typeof data.description === "string" &&
            data.description.trim()
              ? data.description.trim()
              : defaultSettings.description,
        });
      } catch (error) {
        if (
          error instanceof Error &&
          error.name !== "AbortError"
        ) {
          console.error(
            "Unable to load experience section settings:",
            error
          );
        }
      }
    };

    void loadExperience();
    void loadSettings();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <section
      id="experience"
      className="section-padding bg-muted/20"
    >
      <div className="container mx-auto px-3 sm:px-6">
        <SectionHeading
          eyebrow={settings.eyebrow}
          title={settings.title}
          description={settings.description}
        />

        {items.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">
            No experience records have been added yet.
          </p>
        ) : (
          <div className="max-w-5xl mx-auto relative">
            <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-transparent" />

            <div className="space-y-10">
              {items.map((item, index) => {
                const points = normalizePoints(
                  item.points ?? item.description
                );

                const duration = item.duration ?? item.period;

                return (
                  <motion.div
                    key={
                      item.id ??
                      `${item.company}-${item.role}-${index}`
                    }
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.15,
                    }}
                    className="relative"
                  >
                    <div className="absolute left-0 top-6 w-6 h-6 rounded-full bg-gradient-primary ring-4 ring-background z-10" />

                    <div className="ml-12">
                      <div className="glass-card p-5 sm:p-6 rounded-2xl hover:border-primary/40 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)]">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                            <Briefcase className="h-6 w-6 text-primary-foreground" />
                          </div>

                          <div className="min-w-0">
                            <h3 className="font-display font-bold text-2xl sm:text-lg leading-tight break-words">
                              {item.role}
                            </h3>

                            <p className="text-primary text-base sm:text-sm font-medium break-words">
                              {item.company}
                            </p>

                            {(duration || item.location) && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {[duration, item.location]
                                  .filter(Boolean)
                                  .join(" • ")}
                              </p>
                            )}
                          </div>
                        </div>

                        {points.length > 0 && (
                          <ul className="space-y-3">
                            {points.map((point, pointIndex) => (
                              <li
                                key={`${item.id}-${pointIndex}`}
                                className="text-base sm:text-sm text-muted-foreground flex gap-3 leading-relaxed"
                              >
                                <span className="text-primary mt-1 shrink-0">
                                  ▹
                                </span>

                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;