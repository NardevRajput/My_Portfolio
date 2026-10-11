import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import SectionHeading from "./SectionHeading";

type EducationItem = {
  id: number;
  degree: string;
  year: string;
  institution: string;
  location: string;
  description: string;
};

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:8080"
).replace(/\/+$/, "");

const fallbackEducation: EducationItem[] = [
  {
    id: 0,
    degree: "B.Tech in Computer Science",
    year: "2026",
    institution: "Dr. A.P.J. Abdul Kalam Technical University",
    location: "India",
    description:
      "Building a strong foundation in software engineering, data structures, algorithms, databases and full-stack web development — while applying everything I learn through real-world projects.",
  },
];

const Education = () => {
  const [items, setItems] = useState<EducationItem[]>(fallbackEducation);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadEducation = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/education`, {
          method: "GET",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Education request failed (${response.status})`);
        }

        const data: unknown = await response.json();

        if (Array.isArray(data)) {
          // An empty database should display no records rather than stale hard-coded data.
          setItems(data as EducationItem[]);
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        // Keep the fallback education visible if the API is unavailable.
        console.error("Unable to load education from the backend:", error);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    void loadEducation();

    return () => controller.abort();
  }, []);

  return (
    <section id="education" className="py-20 overflow-hidden">
      <div className="w-full mx-auto px-2 sm:px-6">
        <SectionHeading eyebrow="Education" title="Academic Background" />

        {loading && items.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            Loading education...
          </p>
        )}

        {!loading && items.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No education records have been added yet.
          </p>
        )}

        <div className="w-full max-w-4xl mx-auto space-y-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id ?? `${item.degree}-${item.institution}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="glass-card w-full p-5 sm:p-8 md:p-10 rounded-2xl relative overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_0_40px_hsl(var(--primary)/0.15)]"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-all" />

              <div className="flex flex-col md:flex-row gap-5 sm:gap-6 items-start relative z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shrink-0 shadow-[var(--shadow-elegant)] transition-transform duration-300 group-hover:scale-110">
                  <GraduationCap className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" />
                </div>

                <div className="flex-1 w-full min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold">
                      {item.degree} • {item.year}
                    </span>

                    {item.location && (
                      <span className="text-muted-foreground text-sm flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {item.location}
                      </span>
                    )}
                  </div>

                  <h3 className="text-[22px] sm:text-2xl lg:text-3xl font-display font-bold leading-tight mb-3 break-words">
                    {item.degree}
                  </h3>

                  <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed break-words">
                    {item.institution}
                  </p>

                  {item.description && (
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
