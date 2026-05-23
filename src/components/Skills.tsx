import { motion } from "framer-motion";
import { Code, Database, Layers, Server, Wrench } from "lucide-react";
import SectionHeading from "./SectionHeading";

const groups = [
  {
    icon: Code,
    title: "Programming Languages",
    skills: ["Java", "JavaScript", "TypeScript", "Python", "C++"],
  },
  {
    icon: Layers,
    title: "Frontend",
    skills: [
      "HTML",
      "CSS",
      "Tailwind CSS",
      "React.js",
      "Next.js",
      "Framer Motion",
      "Redux",
    ],
  },
  {
    icon: Server,
    title: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "Spring Boot",
      "FastAPI",
      "REST APIs",
      "JWT Auth",
      "Microservices",
    ],
  },
  {
    icon: Database,
    title: "Database",
    skills: ["MongoDB", "MySQL", "PostgreSQL", "Firebase", "Redis"],
  },
  {
    icon: Wrench,
    title: "Other",
    skills: [
      "Cross-Platform Apps",
      "Git & Version Control",
      "Problem-Solving",
      "Debugging",
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="section-padding">
      {/* Full Width Mobile Fix */}
      <div className="w-full max-w-[100%] mx-auto px-3 sm:px-6">
        <SectionHeading
          eyebrow="Skills"
          title="My Tech Stack"
          description="Tools and technologies used to build modern applications."
        />

        {/* Better Mobile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card w-full p-5 sm:p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_0_35px_hsl(var(--primary)/0.12)] group cursor-pointer overflow-hidden"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-[0_0_25px_hsl(var(--primary)/0.5)] transition-all duration-300">
                <g.icon className="h-6 w-6 text-primary-foreground" />
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-xl sm:text-lg mb-4 leading-tight">
                {g.title}
              </h3>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-2 rounded-lg bg-muted text-[15px] sm:text-sm text-foreground border border-border hover:border-primary/40 hover:bg-primary/10 transition-colors break-words"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
