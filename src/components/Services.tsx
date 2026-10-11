
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Layout,
  Monitor,
  Plug,
  Smartphone,
  ServerCog,
  Server,
  Code2,
  Wrench,
  BriefcaseBusiness,
  Database,
  Cloud,
  ShieldCheck,
  Bot,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "./SectionHeading";

type ServiceItem = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

type ServiceSectionContent = {
  heading?: string;
  subtitle?: string;
};

// Uses Vercel's production API URL when configured.
// Falls back to localhost for local development.
const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:8080"
).replace(/\/$/, "");

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Layout,
  Monitor,
  Plug,
  Smartphone,
  ServerCog,
  Server,
  Code2,
  Wrench,
  BriefcaseBusiness,
  Database,
  Cloud,
  ShieldCheck,
  Bot,
};

const getServiceIcon = (name?: string): LucideIcon => {
  if (!name) return ServerCog;

  return (
    iconMap[name] ||
    iconMap[name.charAt(0).toUpperCase() + name.slice(1)] ||
    ServerCog
  );
};

const Services = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [sectionContent, setSectionContent] =
    useState<ServiceSectionContent>({
      heading: "What I Offer",
      subtitle: "Solutions I deliver to bring your ideas to life.",
    });

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadServices = async () => {
      setLoading(true);
      setLoadError(false);

      try {
        const [servicesResponse, contentResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/services`, {
            signal: controller.signal,
          }),
          fetch(`${API_BASE_URL}/api/services/content`, {
            signal: controller.signal,
          }),
        ]);

        if (!servicesResponse.ok) {
          throw new Error(
            `Services request failed: ${servicesResponse.status}`
          );
        }

        const serviceData: ServiceItem[] = await servicesResponse.json();

        if (!Array.isArray(serviceData)) {
          throw new Error("Services API did not return a list.");
        }

        setServices(
          serviceData.map((item) => ({
            id: Number(item.id),
            title: String(item.title ?? ""),
            description: String(item.description ?? ""),
            icon: String(item.icon ?? "ServerCog"),
          }))
        );

        // Keep the default heading and subtitle if content is unavailable.
        if (contentResponse.ok) {
          const contentData: ServiceSectionContent =
            await contentResponse.json();

          setSectionContent({
            heading: contentData?.heading || "What I Offer",
            subtitle:
              contentData?.subtitle ||
              "Solutions I deliver to bring your ideas to life.",
          });
        }
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error("Failed to load Services from backend:", error);
        setLoadError(true);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadServices();

    return () => controller.abort();
  }, []);

  return (
    <section id="services" className="section-padding bg-muted/20">
      <div className="mx-auto w-full max-w-[100%] px-3 sm:px-6">
        <SectionHeading
          eyebrow="Services"
          title={sectionContent.heading || "What I Offer"}
          description={
            sectionContent.subtitle ||
            "Solutions I deliver to bring your ideas to life."
          }
        />

        {loading ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Loading services...
          </p>
        ) : loadError && services.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Services could not be loaded. Please check that the backend is
            running and the API URL is configured correctly.
          </p>
        ) : services.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No services have been added yet. Add service cards from the
            admin dashboard.
          </p>
        ) : (
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = getServiceIcon(service.icon);

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="glass-card group relative w-full cursor-pointer overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_0_35px_hsl(var(--primary)/0.15)] sm:p-7"
                >
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/0 blur-2xl transition-all duration-300 group-hover:bg-primary/10" />

                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary shadow-[var(--shadow-elegant)] transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <Icon className="h-7 w-7 text-primary-foreground" />
                  </div>

                  <h3 className="mb-3 text-2xl font-bold leading-tight sm:text-xl">
                    {service.title}
                  </h3>

                  <p className="break-words text-[15px] leading-relaxed text-muted-foreground sm:text-sm">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
