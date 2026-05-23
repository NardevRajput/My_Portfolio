import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
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

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-background"
    >
      {/* Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[140px]" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-secondary/10 blur-[140px]" />

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10 px-4 md:px-8">
        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="order-1 flex justify-center lg:justify-start"
        >
          <div className="relative">
            {/* Glow Ring */}
            <div
              className="absolute -inset-3 rounded-full border border-primary/60"
              style={{
                boxShadow:
                  "0 0 60px hsl(var(--primary) / 0.55), inset 0 0 40px hsl(var(--primary) / 0.25)",
              }}
            />

            {/* Image */}
            <div className="relative rounded-full overflow-hidden w-72 h-72 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] bg-background">
              <img
                src={portrait}
                alt="Nardev Rajput, software developer portrait"
                width={896}
                height={1024}
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="order-2"
        >
          {/* STATUS */}
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for Opportunities
          </div>

          {/* HEADING */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-extrabold leading-tight mb-4">
            Hi, It's <span className="text-primary">Nardev Rajput</span>
          </h1>

          {/* TYPE ANIMATION */}
          <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-6 h-[60px]">
            I'm a{" "}
            <TypeAnimation
              sequence={[
                "Full Stack Developer",
                2000,

                "Backend Engineer",
                2000,

                "AI/ML Developer",
                2000,

                "Spring Boot Developer",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-primary"
            />
          </div>

          {/* DESCRIPTION */}
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
            Full Stack Developer focused on React, Spring Boot, AI/ML, and
            scalable backend systems. Currently open to internships, freelance
            projects, and full-time software development opportunities.
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
          <div className="flex items-center gap-4 mb-10">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-12 h-12 rounded-md border-2 border-primary/70 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:shadow-[0_0_20px_hsl(var(--primary)/0.6)] transition-all"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4">
            {/* HIRE ME */}
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_30px_hsl(var(--primary)/0.6)] transition-all hover:scale-105 text-base font-semibold rounded-md px-10"
            >
              <a href="#contact">Hire Me</a>
            </Button>

            {/* PROJECTS */}
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-primary/70 text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105 text-base font-semibold rounded-md px-10"
            >
              <a href="#projects">View Projects</a>
            </Button>

            {/* RESUME */}
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary/40 text-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105"
            >
              <a href="/Nardev Rajput.pdf" download target="_blank">
                Download Resume
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
