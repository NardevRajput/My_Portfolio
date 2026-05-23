import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import SectionHeading from "./SectionHeading";

const Education = () => {
  return (
    <section id="education" className="py-20 overflow-hidden">
      {/* container */}
      <div className="w-full mx-auto px-2 sm:px-6">
        <SectionHeading eyebrow="Education" title="Academic Background" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="glass-card w-full p-5 sm:p-8 md:p-10 rounded-2xl relative overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_0_40px_hsl(var(--primary)/0.15)]">
            {/* glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-all" />

            <div className="flex flex-col md:flex-row gap-5 sm:gap-6 items-start relative z-10">
              {/* icon */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shrink-0 shadow-[var(--shadow-elegant)] transition-transform duration-300 group-hover:scale-110">
                <GraduationCap className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" />
              </div>

              {/* content */}
              <div className="flex-1 w-full">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold">
                    B.Tech Graduate • 2026
                  </span>

                  <span className="text-muted-foreground text-sm flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> India
                  </span>
                </div>

                <h3 className="text-[22px] sm:text-2xl lg:text-3xl font-display font-bold leading-tight mb-3 break-words">
                  B.Tech in Computer Science
                </h3>

                <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                  Dr. A.P.J. Abdul Kalam Technical University
                </p>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Building a strong foundation in software engineering, data
                  structures, algorithms, databases and full-stack web
                  development — while applying everything I learn through
                  real-world projects.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
