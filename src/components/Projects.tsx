import { motion } from "framer-motion";
import { useState } from "react";

import {
  FileText,
  Github,
  LayoutDashboard,
  ShoppingBag,
  Zap,
  Grid2x2,
} from "lucide-react";

import { ServerCog } from "lucide-react";

import SectionHeading from "./SectionHeading";
import { Button } from "@/components/ui/button";
import ApplicationsModal from "./ApplicationsModal";

const projects = [
  {
    icon: ShoppingBag,
    title: "E-commerce Platform",
    tag: "Web App",
    status: "Research Phase",
    desc: "Online shopping platform with product browsing, cart, checkout, and order management features.",
    tech: ["React", "Node.js", "MongoDB", "Express", "JWT"],
  },

  {
    icon: LayoutDashboard,
    title: "SecureScan AI",
    tag: "Desktop App",
    status: "In Progress",
    desc: "AI-based system that detects phishing links and protects users from malicious websites.",
    tech: ["Python", "TypeScript", "AI/ML", "FastApi"],
  },

  {
    icon: FileText,
    title: "Smart PDF Manager",
    tag: "Desktop App",
    status: "In Progress",
    desc: "PDF management application for merging, editing, and organizing PDF documents.",
    tech: ["Java", "Spring Boot", "React", "PDFBox", "MySQL"],
  },

  {
    icon: Zap,
    title: "Interactive Systems",
    tag: "Web App",
    status: "Research Phase",
    desc: "Real-time communication platform with live interactions, updates, and user connectivity.",
    tech: ["React", "Node.js", "Socket.io", "MySQL"],
  },
];

const Projects = () => {
  const [openApps, setOpenApps] = useState(false);

  return (
    <>
      <ApplicationsModal open={openApps} onClose={() => setOpenApps(false)} />

      <section id="projects" className="section-padding">
        {/* Mobile Responsive Container */}
        <div className="w-full max-w-[100%] mx-auto px-3 sm:px-6">
          <SectionHeading
            eyebrow="Portfolio"
            title="Featured Projects"
            description="A selection of things I've designed and built."
          />

          {/* Applications Button */}
          <div className="flex justify-center mb-10">
            <Button
              onClick={() => setOpenApps(true)}
              className="bg-gradient-primary hover:opacity-90 px-8 py-6 text-base rounded-2xl"
            >
              <Grid2x2 className="mr-2 h-5 w-5" />
              Applications
            </Button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card w-full p-5 sm:p-7 rounded-2xl hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(255,115,0,0.15)] duration-300 transition-all group relative overflow-hidden"
              >
                {/* Glow */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-secondary/10 blur-2xl group-hover:bg-secondary/20 transition-all" />

                <div className="relative z-10">
                  {/* Top Section */}
                  <div className="flex flex-wrap items-start gap-4 mb-5">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-accent flex items-center justify-center shadow-[var(--shadow-elegant)] shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <p.icon className="h-7 w-7 text-primary-foreground" />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold">
                        {p.tag}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          p.status === "In Progress"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-muted rounded-full mb-5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        p.status === "In Progress"
                          ? "w-[70%] bg-green-400"
                          : "w-[35%] bg-yellow-400"
                      }`}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-3xl sm:text-xl leading-tight mb-3">
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-[16px] sm:text-sm leading-relaxed mb-5">
                    {p.desc}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 text-[16px] sm:text-sm text-muted-foreground mb-6 leading-relaxed">
                    {p.title === "E-commerce Platform" && (
                      <>
                        <li>• JWT Authentication System</li>
                        <li>• Product & Cart Management</li>
                        <li>• Admin Dashboard</li>
                        <li>• REST API Integration</li>
                      </>
                    )}

                    {p.title === "SecureScan AI" && (
                      <>
                        <li>• AI-Based Phishing Detection</li>
                        <li>• Real-Time URL Scanning</li>
                        <li>• FastAPI Backend</li>
                        <li>• ML Model Integration</li>
                      </>
                    )}

                    {p.title === "Smart PDF Manager" && (
                      <>
                        <li>• PDF Merge & Split</li>
                        <li>• File Management System</li>
                        <li>• Spring Boot Backend</li>
                        <li>• MySQL Integration</li>
                      </>
                    )}

                    {p.title === "Interactive Systems" && (
                      <>
                        <li>• Real-Time Messaging</li>
                        <li>• Socket.io Integration</li>
                        <li>• Live User Connectivity</li>
                        <li>• Backend Event Handling</li>
                      </>
                    )}
                  </ul>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[14px] sm:text-xs px-3 py-2 rounded-xl bg-muted border border-border text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary/30 hover:bg-primary/10 hover:scale-105 transition-all w-full sm:w-auto"
                      asChild
                    >
                      <a href="https://github.com/NardevRajput/smart-pdf-manager">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>

                    <Button
                      size="sm"
                      className="bg-gradient-primary hover:opacity-90 w-full sm:w-auto text-sm"
                    >
                      Under Development
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
