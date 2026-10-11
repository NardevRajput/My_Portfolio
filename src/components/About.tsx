import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Code2,
  Rocket,
  Sparkles,
  Lightbulb,
  Target,
  ShieldCheck,
  Zap,
  Cpu,
  Globe,
  Layers,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:8080"
).replace(/\/+$/, "");

type HomeContent = {
  aboutEyebrow?: string | null;
  aboutTitle?: string | null;
  aboutSubtitle?: string | null;
  aboutHeading?: string | null;
  aboutParagraph1?: string | null;
  aboutParagraph2?: string | null;
  aboutParagraph3?: string | null;
  aboutParagraph4?: string | null;
  aboutDescription?: string | null;
};

type AboutCardItem = {
  id: number;
  title: string;
  description?: string | null;
  icon?: string | null;
};

type DisplayTrait = {
  id: number;
  title: string;
  desc: string;
  icon: LucideIcon;
};

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Code2,
  Rocket,
  Sparkles,
  Lightbulb,
  Target,
  ShieldCheck,
  Zap,
  Cpu,
  Globe,
  Layers,
  Wrench,
};

const defaultTraits: DisplayTrait[] = [
  {
    id: -1,
    icon: Brain,
    title: "Problem-Solving Mindset",
    desc: "Breaking down complex challenges into elegant, working solutions.",
  },
  {
    id: -2,
    icon: Code2,
    title: "Practical Project Experience",
    desc: "Building intelligent and scalable software with modern technologies.",
  },
  {
    id: -3,
    icon: Rocket,
    title: "Adaptability & Growth",
    desc: "Always learning new tools, frameworks and best practices.",
  },
  {
    id: -4,
    icon: Sparkles,
    title: "Clean & Functional Design",
    desc: "Building software that looks great and works flawlessly.",
  },
];

const defaultParagraphs = [
  "My core expertise lies in Java and the Spring Boot ecosystem, where I focus on engineering robust, scalable, and high-security software solutions with strong backend architecture and optimized system performance.",
  "I have worked on backend systems, AI Classification APIs, authentication architectures, and enterprise-style applications while contributing as a Software Developer at RCPL. My development work includes building applications for Android, Windows, and modern web platforms with a focus on performance, security, and maintainable architecture.",
  "Alongside application development, I actively work on scalable APIs, secure backend systems, and intelligent software integrations using Java, Spring Boot, FastAPI, React.js, Node.js, MongoDB, and SQL.",
  "Currently, I am deeply focused on System Design, AI/ML & Deep Learning, and Reverse Engineering to build more advanced, intelligent, and security-driven software systems.",
];

const About = () => {
  const [homeContent, setHomeContent] = useState<HomeContent>({});
  const [traits, setTraits] = useState<AboutCardItem[]>([]);
  const [cardsLoaded, setCardsLoaded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadHomeContent = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/home/content`, {
          method: "GET",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Unable to load About content (${response.status})`);
        }

        const data: unknown = await response.json();
        if (data && typeof data === "object" && !Array.isArray(data)) {
          setHomeContent(data as HomeContent);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Failed to load About content from backend:", error);
        }
      }
    };

    const loadAboutCards = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/about-cards`, {
          method: "GET",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Unable to load About cards (${response.status})`);
        }

        const data: unknown = await response.json();
        if (Array.isArray(data)) {
          const validCards = data.filter(
            (item): item is AboutCardItem =>
              item !== null &&
              typeof item === "object" &&
              typeof item.id === "number" &&
              typeof item.title === "string"
          );
          setTraits(validCards);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Failed to load About cards from backend:", error);
        }
      } finally {
        if (!controller.signal.aborted) setCardsLoaded(true);
      }
    };

    void loadHomeContent();
    void loadAboutCards();

    return () => controller.abort();
  }, []);

  const displayedTraits: DisplayTrait[] =
    cardsLoaded && traits.length > 0
      ? traits.map((trait) => ({
          id: trait.id,
          title: trait.title,
          desc: trait.description ?? "",
          icon: iconMap[trait.icon || ""] || Sparkles,
        }))
      : defaultTraits;

  const eyebrow = homeContent.aboutEyebrow?.trim() || "About Me";
  const sectionTitle = homeContent.aboutTitle?.trim() || "Who I Am";
  const subtitle =
    homeContent.aboutSubtitle?.trim() ||
    "Get to know the developer behind the code.";

  const heading =
    homeContent.aboutHeading?.trim() ||
    "I am a Software Developer specializing in backend architecture, secure systems, and cross-platform application development.";

  const paragraphs = [
    homeContent.aboutParagraph1?.trim() || defaultParagraphs[0],
    homeContent.aboutParagraph2?.trim() || defaultParagraphs[1],
    homeContent.aboutParagraph3?.trim() || defaultParagraphs[2],
    homeContent.aboutParagraph4?.trim() || defaultParagraphs[3],
  ];

  return (
    <section id="about" className="py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <SectionHeading
          eyebrow={eyebrow}
          title={sectionTitle}
          description={subtitle}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card w-full p-5 sm:p-8 lg:p-10 rounded-3xl overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_hsl(var(--primary)/0.15)]"
        >
          <h3 className="text-[20px] sm:text-[32px] lg:text-[42px] font-display font-bold leading-tight mb-6 max-w-6xl">
            <span className="gradient-text">{heading}</span>
          </h3>

          <div className="space-y-5">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-muted-foreground leading-relaxed text-[15px] sm:text-base lg:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        <div className="mt-8 flex flex-col gap-6">
          {[0, 1].map((row) => {
            const rowTraits = displayedTraits.slice(row * 2, row * 2 + 2);
            if (rowTraits.length === 0) return null;

            return (
              <div
                key={row}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {rowTraits.map((trait, index) => {
                  const Icon = trait.icon;

                  return (
                    <motion.div
                      key={trait.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                      }}
                      className="glass-card p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.12)] group cursor-pointer"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-7 w-7 text-primary-foreground" />
                      </div>

                      <h4 className="font-display font-bold text-xl sm:text-2xl mb-3">
                        {trait.title}
                      </h4>

                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                        {trait.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
