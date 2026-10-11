import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import {
  LayoutGrid, FileText, BrainCircuit, ShieldCheck, UserRound, Music2,
  Smartphone, Monitor, Search, X, Code2, AppWindow, ExternalLink,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8080").replace(/\/$/, "");

type ApplicationItem = {
  id?: number | string;
  title: string;
  description?: string;
  platforms?: string[] | string;
  androidUrl?: string;
  windowsUrl?: string;
  icon?: string;
  imageUrl?: string;
  iconColor?: string;
  iconBg?: string;
  iconBorder?: string;
};

type ApplicationSectionContent = {
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
  sectionHeading?: string;
  sectionSubtitle?: string;
};

const fallbackApplications: ApplicationItem[] = [
  { title: "Smart PDF Manager", description: "Advanced PDF management tool for reading, merging, compressing and organizing PDFs.", icon: "FileText", iconColor: "text-red-500", iconBg: "bg-red-500/10", iconBorder: "border-red-500/20" },
  { title: "AI Classification API", description: "AI-powered classification API for intelligent predictions and data processing.", icon: "BrainCircuit", iconColor: "text-blue-500", iconBg: "bg-blue-500/10", iconBorder: "border-blue-500/20" },
  { title: "SpringBoot JWT Auth API", description: "Secure authentication API using JWT with Spring Boot and best security practices.", icon: "ShieldCheck", iconColor: "text-green-500", iconBg: "bg-green-500/10", iconBorder: "border-green-500/20" },
  { title: "User Profile Management App", description: "Manage users, profiles and secure data with a modern and responsive interface.", icon: "UserRound", iconColor: "text-cyan-500", iconBg: "bg-cyan-500/10", iconBorder: "border-cyan-500/20" },
  { title: "Sangeet", description: "Online music streaming app with a modern player and smooth experience.", icon: "Music2", iconColor: "text-pink-500", iconBg: "bg-pink-500/10", iconBorder: "border-pink-500/20" },
];

const iconMap: Record<string, LucideIcon> = {
  FileText, BrainCircuit, ShieldCheck, UserRound, Music2, LayoutGrid, Code2, AppWindow,
};

function unwrapList(data: unknown): ApplicationItem[] {
  if (Array.isArray(data)) return data as ApplicationItem[];
  if (data && typeof data === "object") {
    const value = data as Record<string, unknown>;
    if (Array.isArray(value.data)) return value.data as ApplicationItem[];
    if (Array.isArray(value.applications)) return value.applications as ApplicationItem[];
    if (Array.isArray(value.content)) return value.content as ApplicationItem[];
  }
  return [];
}

function unwrapSection(data: unknown): ApplicationSectionContent {
  if (data && typeof data === "object") {
    const value = data as Record<string, unknown>;
    const nested = value.data && typeof value.data === "object" ? value.data as Record<string, unknown> : value;
    return nested as ApplicationSectionContent;
  }
  return {};
}

const ApplicationCard = ({ app }: { app: ApplicationItem }) => {
  const Icon = iconMap[app.icon || ""] || AppWindow;
  const platforms = Array.isArray(app.platforms)
    ? app.platforms.map((platform) => platform.toLowerCase())
    : typeof app.platforms === "string"
      ? app.platforms.split(/[,|]/).map((platform) => platform.trim().toLowerCase())
      : ["android", "windows"];
  const hasAndroid = platforms.includes("android") || Boolean(app.androidUrl);
  const hasWindows = platforms.includes("windows") || Boolean(app.windowsUrl);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_12px_35px_rgba(255,115,0,0.10)] sm:p-5">
      <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-primary/5 blur-3xl transition-all duration-500 group-hover:bg-primary/10" />
      <div className="relative z-10">
        <div className="flex items-start gap-3">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border ${app.iconBg || "bg-primary/10"} ${app.iconBorder || "border-primary/20"} transition-transform duration-300 group-hover:scale-105`}>
            {app.imageUrl ? (
              <img src={app.imageUrl} alt={`${app.title} icon`} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <Icon className={`h-6 w-6 ${app.iconColor || "text-primary"}`} strokeWidth={1.8} />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-bold leading-tight text-foreground sm:text-lg">{app.title}</h2>
            <p className="mt-1.5 text-xs leading-5 text-muted-foreground sm:text-sm">{app.description || "Explore this application and its features."}</p>
          </div>
        </div>
        {(hasAndroid || hasWindows) && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {hasAndroid && (
              app.androidUrl ? (
                <a href={app.androidUrl} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/5 px-3 text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground">
                  <Smartphone className="mr-1.5 h-4 w-4" strokeWidth={2} /><span className="text-xs font-semibold">Android</span><ExternalLink className="ml-1 h-3 w-3" />
                </a>
              ) : (
                <Button type="button" variant="outline" disabled className="h-10 rounded-xl border-primary/25 px-3"><Smartphone className="mr-1.5 h-4 w-4" /><span className="text-xs font-semibold">Android</span></Button>
              )
            )}
            {hasWindows && (
              app.windowsUrl ? (
                <a href={app.windowsUrl} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/5 px-3 text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground">
                  <Monitor className="mr-1.5 h-4 w-4" strokeWidth={2} /><span className="text-xs font-semibold">Windows</span><ExternalLink className="ml-1 h-3 w-3" />
                </a>
              ) : (
                <Button type="button" variant="outline" disabled className="h-10 rounded-xl border-primary/25 px-3"><Monitor className="mr-1.5 h-4 w-4" /><span className="text-xs font-semibold">Windows</span></Button>
              )
            )}
          </div>
        )}
      </div>
    </article>
  );
};

const Applications = () => {
  const [applications, setApplications] = useState<ApplicationItem[]>(fallbackApplications);
  const [section, setSection] = useState<ApplicationSectionContent>({
    eyebrow: "Applications",
    heading: "My Applications",
    subtitle: "Software applications and systems I have built or worked on.",
    sectionHeading: "Applications",
    sectionSubtitle: "Download my apps for Android and Windows",
  });
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const [appsResponse, sectionResponse] = await Promise.all([
          fetch(`${API_BASE}/api/applications`),
          fetch(`${API_BASE}/api/applications/section`),
        ]);
        if (appsResponse.ok) {
          const apps = unwrapList(await appsResponse.json());
          if (active && apps.length) setApplications(apps);
          else if (active && apps.length === 0) setApplications([]);
        }
        if (sectionResponse.ok) {
          const content = unwrapSection(await sectionResponse.json());
          if (active) setSection((current) => ({ ...current, ...content }));
        }
      } catch (error) {
        console.error("Could not load applications from the API; showing fallback data.", error);
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    return () => { active = false; };
  }, []);

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return applications;
    return applications.filter((app) =>
      (app.title || "").toLowerCase().includes(query) ||
      (app.description || "").toLowerCase().includes(query)
    );
  }, [applications, search]);

  const suggestions = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return [];
    return applications
      .filter((app) => (app.title || "").toLowerCase().includes(query))
      .slice(0, 5);
  }, [applications, search]);

  const clearSearch = () => {
    setSearch("");
    setShowSearch(false);
    setShowSuggestions(false);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="section-padding pt-28 sm:pt-32">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow={section.eyebrow || "Applications"}
            title={section.heading || "My Applications"}
            description={section.subtitle || "Software applications and systems I have built or worked on."}
          />

          <div className="mb-5 mt-8 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                <LayoutGrid className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl font-bold leading-tight sm:text-2xl">{section.sectionHeading || "Applications"}</h2>
                <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{section.sectionSubtitle || "Download my apps for Android and Windows"}</p>
              </div>
            </div>
            <Button type="button" variant="outline" onClick={() => { setShowSearch((value) => !value); setShowSuggestions(false); }} className="h-10 w-10 shrink-0 rounded-xl border-border p-0 transition-all hover:border-primary hover:bg-primary/10 hover:text-primary" aria-label="Search applications">
              {showSearch ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            </Button>
          </div>

          {showSearch && (
            <form className="relative mx-auto mb-6 flex w-full max-w-lg items-center gap-2" onSubmit={(event) => { event.preventDefault(); setShowSuggestions(false); }}>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => { setSearch(event.target.value); setShowSuggestions(true); }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={(event) => { if (event.key === "Escape") setShowSuggestions(false); }}
                  placeholder="Search by application name..."
                  autoFocus
                  className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-9 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
                  aria-label="Search applications by name"
                  aria-autocomplete="list"
                />
                {search && <button type="button" onClick={() => { setSearch(""); setShowSuggestions(false); }} className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Clear search"><X className="h-3.5 w-3.5" /></button>}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-border bg-background shadow-xl" role="listbox">
                    {suggestions.map((app) => (
                      <button key={String(app.id ?? app.title)} type="button" role="option" onClick={() => { setSearch(app.title); setShowSuggestions(false); }} className="block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-primary/10">
                        <span className="font-medium">{app.title}</span>
                        {app.description && <span className="mt-0.5 block truncate text-xs text-muted-foreground">{app.description}</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Button type="submit" className="h-10 rounded-xl bg-gradient-primary px-4 text-xs font-semibold hover:opacity-90"><Search className="mr-1.5 h-4 w-4" />Search</Button>
            </form>
          )}

          {showSearch && search.trim() && (
            <p className="mb-5 text-center text-xs text-muted-foreground">
              {filteredApplications.length === 0 ? "No applications found." : `${filteredApplications.length} application${filteredApplications.length === 1 ? "" : "s"} found`}
            </p>
          )}

          {loading ? (
            <div className="py-12 text-center text-sm text-muted-foreground">Loading applications...</div>
          ) : filteredApplications.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
              {filteredApplications.map((app, index) => <ApplicationCard key={String(app.id ?? app.title ?? index)} app={app} />)}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card/40 px-5 py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10"><Search className="h-5 w-5 text-primary" /></div>
              <h3 className="text-lg font-bold">No Applications Found</h3>
              <p className="mt-1 text-sm text-muted-foreground">Try searching with another application name.</p>
              <Button onClick={clearSearch} variant="outline" className="mt-4 h-9 rounded-lg border-primary/30 text-xs hover:bg-primary hover:text-primary-foreground">Clear Search</Button>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Applications;
