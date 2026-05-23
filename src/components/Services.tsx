import { motion } from "framer-motion";
import { ServerCog } from "lucide-react";
import { Globe, Layout, Monitor, Plug, Smartphone } from "lucide-react";

import SectionHeading from "./SectionHeading";

const services = [
  {
    icon: Globe,
    title: "Full Stack Web Development",
    desc: "End-to-end web apps with React, Node.js, Express and modern databases.",
  },

  {
    icon: Monitor,
    title: "Cross-Platform Software",
    desc: "Apps that run beautifully on Windows, macOS, Android and iOS.",
  },

  {
    icon: Layout,
    title: "Dashboards & Admin Panels",
    desc: "Data-rich, interactive dashboards with clean UI and real-time insights.",
  },

  {
    icon: Smartphone,
    title: "Custom Applications",
    desc: "Tailored desktop and mobile applications built around your workflow.",
  },

  {
    icon: Plug,
    title: "API Integration",
    desc: "Seamlessly connect third-party services and build robust backends.",
  },

  {
    icon: ServerCog,
    title: "Backend Development",
    desc: "Scalable and secure backend systems using Spring Boot, FastAPI, Node.js and modern databases.",
  },
];

const Services = () => {
  return (
    <section id="services" className="section-padding bg-muted/20">
      {/* Full Width Mobile Fix */}
      <div className="w-full max-w-[100%] mx-auto px-3 sm:px-6">
        <SectionHeading
          eyebrow="Services"
          title="What I Offer"
          description="Solutions I deliver to bring your ideas to life."
        />

        {/* Better Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card w-full p-5 sm:p-7 rounded-2xl hover:border-primary/40 hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden hover:shadow-[0_0_35px_hsl(var(--primary)/0.15)] cursor-pointer"
            >
              {/* Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary/0 group-hover:bg-primary/10 blur-2xl transition-all duration-300" />

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-[var(--shadow-elegant)]">
                <s.icon className="h-7 w-7 text-primary-foreground" />
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-2xl sm:text-xl leading-tight mb-3">
                {s.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-[15px] sm:text-sm leading-relaxed break-words">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
