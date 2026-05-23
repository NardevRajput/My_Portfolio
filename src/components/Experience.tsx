import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import SectionHeading from "./SectionHeading";

const items = [
  {
    role: "Full Stack Developer",
    company: "Personal Portfolio Project",
    points: [
      "Developing a modern full-stack portfolio using React, TypeScript, Spring Boot, and MySQL.",
      "Implemented JWT authentication, protected admin dashboard, REST APIs, and secure backend systems.",
      "Built contact management system with email integration, Excel export, and rate limiting security.",
    ],
  },

  {
    role: "Backend Developer",
    company: "Spring Boot Practice Projects",
    points: [
      "Building scalable backend systems using Spring Boot and REST APIs.",
      "Integrated JWT authentication, CORS security, database operations, and API handling.",
      "Worked on production-style backend architecture and admin management systems.",
    ],
  },

  {
    role: "AI/ML Developer",
    company: "Final Year Project",
    points: [
      "Developing an AI/ML phishing detection and prevention system.",
      "Using FastAPI, Python, and Transformer-based models for malicious URL detection.",
      "Focused on real-time phishing analysis and secure browsing protection.",
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="section-padding bg-muted/20">
      <div className="container mx-auto px-3 sm:px-6">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've Worked"
          description="Hands-on contributions to real software products."
        />

        <div className="max-w-5xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-transparent" />

          <div className="space-y-10">
            {items.map((item, i) => (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                {/* Dot */}
                <div className="absolute left-0 top-6 w-6 h-6 rounded-full bg-gradient-primary ring-4 ring-background z-10" />

                {/* Card */}
                <div className="ml-12">
                  <div className="glass-card p-5 sm:p-6 rounded-2xl hover:border-primary/40 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                        <Briefcase className="h-6 w-6 text-primary-foreground" />
                      </div>

                      <div>
                        <h3 className="font-display font-bold text-2xl sm:text-lg leading-tight">
                          {item.role}
                        </h3>

                        <p className="text-primary text-base sm:text-sm font-medium">
                          {item.company}
                        </p>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {item.points.map((p) => (
                        <li
                          key={p}
                          className="text-base sm:text-sm text-muted-foreground flex gap-3 leading-relaxed"
                        >
                          <span className="text-primary mt-1 shrink-0">▹</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
