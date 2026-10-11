
import { useEffect, useState } from "react";

import {
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Code2,
  Lightbulb,
  Rocket,
  Brain,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import portrait from "@/assets/nardev-portrait.jpg";
import { TypeAnimation } from "react-type-animation";

const socials = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/nardev-rajput-813a83275/",
    label: "LinkedIn",
  },
  {
    icon: Github,
    href: "https://github.com/NardevRajput",
    label: "GitHub",
  },
  {
    icon: Twitter,
    href: "https://x.com/NardevRajput1",
    label: "Twitter",
  },
  {
    icon: Instagram,
    href: "https://instagram.com",
    label: "Instagram",
  },
];

const focusAreas = [
  {
    icon: Code2,
    title: "Clean Development",
    description:
      "I focus on writing clean, maintainable, and well-structured code that is easy to understand and extend.",
  },
  {
    icon: Brain,
    title: "Problem Solving",
    description:
      "I enjoy understanding real-world problems and turning them into practical and reliable software solutions.",
  },
  {
    icon: Rocket,
    title: "Modern Technology",
    description:
      "I continuously explore modern technologies and development practices to build better software.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Learning",
    description:
      "I believe consistent learning and experimentation are essential for growing as a software developer.",
  },
];

const Hero = () => {
  const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8080").replace(/\/$/, "");
  const [heroImage, setHeroImage] = useState<string>(portrait);

  type EditableSection = { eyebrow?: string; heading?: string; description?: string; title?: string; subheading?: string };
  type EditableCard = { id?: number | string; title: string; description: string; icon?: string };
  const [mindsetContent, setMindsetContent] = useState<EditableSection>({
    eyebrow: "Developer Mindset",
    heading: "More Than Just Code",
    description: "I believe good software is not only about writing code. It is about understanding problems, learning continuously, and creating solutions that are useful, reliable, and maintainable.",
  });
  const [mindsetCards, setMindsetCards] = useState<EditableCard[]>(focusAreas.map(({ title, description }) => ({ title, description })));
  const [visionContent, setVisionContent] = useState<EditableSection>({
    eyebrow: "My Vision",
    heading: "Building. Learning. Growing.",
    description: "My goal is to grow as a strong Software Developer by working on meaningful products, solving challenging technical problems, and continuously improving my engineering skills. I am always interested in learning new technologies and turning ideas into real-world applications.",
  });
  const [visionCards, setVisionCards] = useState<EditableCard[]>([]);
  const [homeContent, setHomeContent] = useState({
    heroTitle: "Hi, It's Nardev Rajput",
    heroRole: "I'm a Software Developer",
    heroDescription:
      "Software Developer focused on building modern web applications, scalable backend systems, and practical software solutions. I enjoy working with Java, Spring Boot, React, databases, and emerging AI technologies.",
    resumeUrl: "/Nardev Rajput.pdf",
    linkedin: "https://www.linkedin.com/in/nardev-rajput-813a83275/",
    github: "https://github.com/NardevRajput",
    instagram: "https://instagram.com",
  });

  useEffect(() => {
    const controller = new AbortController();
    const loadManagedSection = async (
      endpoint: "mindset" | "vision",
      setContent: (value: (current: EditableSection) => EditableSection) => void,
      setCards: (value: EditableCard[]) => void,
    ) => {
      try {
        const response = await fetch(`${API_URL}/api/${endpoint}`, {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`${endpoint} request failed: ${response.status}`);
        const data = await response.json();
        if (data?.content) {
          setContent((current) => ({
            eyebrow: data.content.eyebrow ?? current.eyebrow,
            heading: data.content.heading ?? data.content.subheading ?? data.content.title ?? current.heading,
            description: data.content.description ?? current.description,
          }));
        }
        if (Array.isArray(data?.cards)) setCards(data.cards);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        console.error(`Could not load ${endpoint} content; using defaults.`, error);
      }
    };
    void loadManagedSection("mindset", setMindsetContent, setMindsetCards);
    void loadManagedSection("vision", setVisionContent, setVisionCards);
    return () => controller.abort();
  }, [API_URL]);

  useEffect(() => {
    const controller = new AbortController();
    let objectUrl: string | null = null;

    fetch(`${API_URL}/api/home/content`, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Home content request failed: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setHomeContent((current) => ({
          heroTitle: data.heroTitle ?? current.heroTitle,
          heroRole: data.heroRole ?? current.heroRole,
          heroDescription: data.heroDescription ?? current.heroDescription,
          resumeUrl: data.resumeUrl ?? current.resumeUrl,
          linkedin: data.linkedin ?? current.linkedin,
          github: data.github ?? current.github,
          instagram: data.instagram ?? current.instagram,
        }));
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        console.error("Could not load saved Home content; using default content.", error);
      });

    fetch(`${API_URL}/api/home/hero-image`, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Hero image request failed: ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        if (!blob.type.startsWith("image/")) {
          throw new Error("The hero image endpoint did not return an image.");
        }

        objectUrl = URL.createObjectURL(blob);
        setHeroImage(objectUrl);
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        console.error("Could not load the saved hero image; using the default portrait.", error);
      });

    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [API_URL]);

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-background"
      >
        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-[1600px] grid-cols-1 items-center gap-6 px-3 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8 xl:px-10">
          {/* ================= LARGE FULL-BODY IMAGE ================= */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -8, 0],
            }}
            transition={{
              opacity: { duration: 0.7 },
              x: { duration: 0.7 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
            className="order-1 flex min-w-0 w-full items-center justify-center lg:justify-start"
          >
            {/* Large open image area: no frame, crop, background, ring, or grayscale filter */}
            <div className="flex h-[52vh] min-h-[360px] w-full items-center justify-center sm:h-[62vh] sm:min-h-[440px] lg:h-[calc(100vh-8rem)] lg:min-h-[560px] lg:max-h-[850px]">
              <img
                src={heroImage}
                alt="Nardev Rajput, full-body portrait"
                width={1200}
                height={1600}
                className="block h-full w-full object-contain object-center lg:object-left"
              />
            </div>
          </motion.div>

          {/* ================= RIGHT CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-2 min-w-0 w-full max-w-full"
          >
            {/* STATUS */}
            <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for Opportunities
            </div>

            {/* HEADING */}
            <h1 className="mb-4 break-words text-4xl font-display font-extrabold leading-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              {homeContent.heroTitle}
            </h1>

            {/* TYPE ANIMATION */}
            <div className="mb-6 h-[60px] max-w-full break-words text-2xl font-display font-bold sm:text-3xl lg:text-4xl">
              <TypeAnimation
                sequence={[
                  homeContent.heroRole,
                  2500,
                  "My Skills",
                  1500,
                  "Java",
                  1500,
                  "Spring Boot",
                  1500,
                  "JavaScript",
                  1500,
                  "React.js",
                  1500,
                  "MySQL",
                  1500,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-primary"
              />
            </div>

            {/* DESCRIPTION */}
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              {homeContent.heroDescription}
            </p>

            {/* TECH STACK */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                "React",
                "TypeScript",
                "Spring Boot",
                "JWT Auth",
                "FastAPI",
                "MySQL",
                "AI/ML",
                "REST APIs",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-sm text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* SOCIALS */}
            <div className="relative z-50 flex items-center gap-4 mb-10">
              {socials.map(({ icon: Icon, href, label }) => {
                const dynamicHref =
                  label === "LinkedIn"
                    ? homeContent.linkedin
                    : label === "GitHub"
                      ? homeContent.github
                      : label === "Instagram"
                        ? homeContent.instagram
                        : href;

                if (!dynamicHref) return null;

                return (
                <a
                  key={label}
                  href={dynamicHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="relative z-50 w-12 h-12 rounded-md border-2 border-primary/70 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:shadow-[0_0_20px_hsl(var(--primary)/0.6)] transition-all duration-300 cursor-pointer"
                >
                  <Icon className="h-5 w-5 pointer-events-none" />
                </a>
                );
              })}
            </div>

            {/* ================= BUTTONS ================= */}
            <div className="flex flex-wrap gap-4">
              {/* PROJECTS */}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary/70 text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105 text-base font-semibold rounded-md px-10"
              >
                <Link to="/projects">View Projects</Link>
              </Button>

              {/* RESUME */}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/40 text-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105"
              >
                <a href={homeContent.resumeUrl || "/Nardev Rajput.pdf"} download target="_blank" rel="noopener noreferrer">
                  Download Resume
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= DEVELOPER FOCUS ================= */}
      <section className="relative py-24 bg-background overflow-hidden">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-[140px]" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* SECTION HEADING */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
              {mindsetContent.eyebrow || "Developer Mindset"}
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-5">
              {mindsetContent.heading || "More Than Just Code"}
            </h2>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {mindsetContent.description}
            </p>
          </motion.div>

          {/* FOCUS CARDS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mindsetCards.map((item, index) => {
              const iconName = (item.icon || "").toLowerCase();
              const Icon = iconName.includes("brain") ? Brain : iconName.includes("rocket") ? Rocket : iconName.includes("light") ? Lightbulb : Code2;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="group p-6 rounded-2xl border border-primary/20 bg-primary/[0.03] hover:bg-primary/[0.07] hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl border border-primary/30 bg-primary/10 flex items-center justify-center mb-5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-semibold mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CAREER VISION ================= */}
      <section className="relative py-24 overflow-hidden border-t border-primary/10">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/[0.04] p-8 md:p-12 lg:p-16"
          >
            {/* Glow */}
            <div className="pointer-events-none absolute -top-32 -right-32 w-72 h-72 rounded-full bg-primary/10 blur-[100px]" />

            <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-10 items-center">
              <div className="max-w-3xl">
                <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-4">
                  {visionContent.eyebrow || "My Vision"}
                </p>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight mb-6">
                  {visionContent.heading || "Building. Learning. Growing."}
                </h2>

                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  {visionContent.description}
                </p>
              </div>

              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all hover:scale-105 font-semibold rounded-md px-8"
              >
                <Link to="/contact">Let's Connect</Link>
              </Button>
            </div>
            {visionCards.length > 0 && (
              <div className="relative z-10 mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visionCards.map((card, index) => (
                  <motion.div
                    key={card.id ?? `${card.title}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-primary/20 bg-background/60 p-5"
                  >
                    <h3 className="mb-2 text-lg font-semibold">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
