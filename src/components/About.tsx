import { motion } from "framer-motion";
import { Brain, Code2, Rocket, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";

const traits = [
  {
    icon: Brain,
    title: "Problem-Solving Mindset",
    desc: "Breaking down complex challenges into elegant, working solutions.",
  },

  {
    icon: Code2,
    title: "Practical Project Experience",
    desc: "Building intelligent and scalable software with modern technologies.",
  },

  {
    icon: Rocket,
    title: "Adaptability & Growth",
    desc: "Always learning new tools, frameworks and best practices.",
  },

  {
    icon: Sparkles,
    title: "Clean & Functional Design",
    desc: "Building software that looks great and works flawlessly.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <SectionHeading
          eyebrow="About Me"
          title="Who I Am"
          description="Get to know the developer behind the code."
        />

        {/* MAIN ABOUT CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card w-full p-5 sm:p-8 lg:p-10 rounded-3xl overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_hsl(var(--primary)/0.15)]"
        >
          <h3 className="text-[20px] sm:text-[32px] lg:text-[42px] font-display font-bold leading-tight mb-6 max-w-6xl">
            I am a Software Developer{" "}
            <span className="gradient-text">
              specializing in backend architecture,
            </span>{" "}
            secure systems, and cross-platform application development.
          </h3>

          <div className="space-y-5">
            <p className="text-muted-foreground leading-relaxed text-[15px] sm:text-base lg:text-lg">
              My core expertise lies in Java and the Spring Boot ecosystem,
              where I focus on engineering robust, scalable, and high-security
              software solutions with strong backend architecture and optimized
              system performance.
            </p>

            <p className="text-muted-foreground leading-relaxed text-[15px] sm:text-base lg:text-lg">
              I have worked on backend systems, AI Classification APIs,
              authentication architectures, and enterprise-style applications
              while contributing as a Software Developer at{" "}
              <strong className="text-foreground">RCPL</strong>. My development
              work includes building applications for Android, Windows, and
              modern web platforms with a focus on performance, security, and
              maintainable architecture.
            </p>

            <p className="text-muted-foreground leading-relaxed text-[15px] sm:text-base lg:text-lg">
              Alongside application development, I actively work on scalable
              APIs, secure backend systems, and intelligent software
              integrations using Java, Spring Boot, FastAPI, React.js, Node.js,
              MongoDB, and SQL.
            </p>

            <p className="text-muted-foreground leading-relaxed text-[15px] sm:text-base lg:text-lg">
              Currently, I am deeply focused on{" "}
              <strong className="text-foreground">System Design</strong>,{" "}
              <strong className="text-foreground">AI/ML & Deep Learning</strong>
              , and{" "}
              <strong className="text-foreground">Reverse Engineering</strong>{" "}
              to build more advanced, intelligent, and security-driven software
              systems.
            </p>
          </div>
        </motion.div>

        {/* TRAITS */}
        <div className="mt-8 flex flex-col gap-6">
          {/* ROW 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {traits.slice(0, 2).map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.12)] group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <t.icon className="h-7 w-7 text-primary-foreground" />
                </div>

                <h4 className="font-display font-bold text-xl sm:text-2xl mb-3">
                  {t.title}
                </h4>

                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {t.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {traits.slice(2, 4).map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.12)] group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <t.icon className="h-7 w-7 text-primary-foreground" />
                </div>

                <h4 className="font-display font-bold text-xl sm:text-2xl mb-3">
                  {t.title}
                </h4>

                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {t.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
