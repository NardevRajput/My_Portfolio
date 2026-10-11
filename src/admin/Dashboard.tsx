import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Image as ImageIcon,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronUp,
  FileText,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Plus,
  Save,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserRound,
  Users,
  Wrench,
  X,
} from "lucide-react";

import API, { getContacts, deleteContact } from "./adminApi";

/* =========================================================
   TYPES
========================================================= */

type Tab =
  | "overview"
  | "home"
  | "education"
  | "experience"
  | "skills"
  | "services"
  | "projects"
  | "applications"
  | "mindset"
  | "vision"
  | "contacts";

type EducationItem = {
  id: number;
  degree: string;
  year: string;
  institution: string;
  location: string;
  description: string;
};

type ExperienceItem = {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
};

type SkillGroup = {
  id: number;
  title: string;
  icon: string;
  skills: string[];
};

type SkillSectionContent = {
  id?: number;
  heading: string;
  subtitle: string;
};

type ServiceItem = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

type ServiceSectionContent = {
  id?: number;
  heading: string;
  subtitle: string;
};

type ProjectItem = {
  id: number;
  title: string;
  category: string;
  status: string;
  description: string;
  progress: number;
  tech: string[];
  features: string[];
  github: string;
  buttonText: string;
};

type ProjectSectionContent = {
  id?: number;
  eyebrow: string;
  heading: string;
  subtitle: string;
};

type ApplicationItem = {
  id: number;
  title: string;
  description: string;
  platforms: string[];
  androidUrl: string;
  windowsUrl: string;
  icon?: string;
  imageUrl?: string;
};

type ApplicationSectionContent = {
  id?: number;
  eyebrow: string;
  heading: string;
  subtitle: string;
  sectionHeading: string;
  sectionSubtitle: string;
};

type AboutCardItem = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

/* =========================================================
   NAVIGATION
========================================================= */

const navItems: {
  id: Tab;
  label: string;
  icon: React.ElementType;
}[] = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    id: "home",
    label: "Home Content",
    icon: UserRound,
  },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
  },
  {
    id: "experience",
    label: "Experience",
    icon: BriefcaseBusiness,
  },
  {
    id: "skills",
    label: "Skills",
    icon: Sparkles,
  },
  {
    id: "services",
    label: "Services",
    icon: Wrench,
  },
  {
    id: "projects",
    label: "Projects",
    icon: FolderKanban,
  },
  {
    id: "applications",
    label: "Applications",
    icon: Activity,
  },
  {
    id: "mindset",
    label: "Developer Mindset",
    icon: Sparkles,
  },
  {
    id: "vision",
    label: "My Vision",
    icon: Activity,
  },
  {
    id: "contacts",
    label: "Contacts",
    icon: Mail,
  },
];

/* =========================================================
   INITIAL DATA
========================================================= */




const initialProjects: ProjectItem[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "Web App",
    status: "Research Phase",
    description:
      "Online shopping platform with product browsing, cart, checkout and order management features.",
    progress: 35,
    tech: ["React", "Node.js", "MongoDB", "Express", "JWT"],
    github: "",
  },
  {
    id: 2,
    title: "SecureScan AI",
    category: "AI / ML",
    status: "In Progress",
    description:
      "AI-based system that detects phishing links and protects users from malicious websites.",
    progress: 70,
    tech: ["Python", "TypeScript", "AI/ML", "FastAPI"],
    github: "",
  },
];

const initialApplications: ApplicationItem[] = [
  {
    id: 1,
    title: "Smart PDF Manager",
    description:
      "Advanced PDF management tool for reading, merging, compressing and organizing PDFs.",
    platforms: ["Android", "Windows"],
    androidUrl: "",
    windowsUrl: "",
  },
  {
    id: 2,
    title: "AI Classification API",
    description:
      "AI-powered classification API for intelligent predictions and data processing.",
    platforms: ["Android", "Windows"],
    androidUrl: "",
    windowsUrl: "",
  },
  {
    id: 3,
    title: "SpringBoot JWT Auth API",
    description:
      "Secure authentication API using JWT with Spring Boot and best security practices.",
    platforms: ["Android", "Windows"],
    androidUrl: "",
    windowsUrl: "",
  },
  {
    id: 4,
    title: "User Profile Management App",
    description:
      "Manage users, profiles and secure data with a modern responsive interface.",
    platforms: ["Android", "Windows"],
    androidUrl: "",
    windowsUrl: "",
  },
  {
    id: 5,
    title: "Sangeet",
    description:
      "Online music streaming application with a modern player and smooth user experience.",
    platforms: ["Android", "Windows"],
    androidUrl: "",
    windowsUrl: "",
  },
];

/* =========================================================
   COMMON STYLES
========================================================= */

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500/70 focus:ring-2 focus:ring-orange-500/10";

const labelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400";

/* =========================================================
   HELPERS
========================================================= */

const nextId = <T extends { id: number }>(items: T[]) => {
  return items.length
    ? Math.max(...items.map((item) => item.id)) + 1
    : 1;
};

/* =========================================================
   MAIN DASHBOARD
========================================================= */

type SectionManagerKind = "mindset" | "vision";
type ManagedCard = { id: number; title: string; description: string; icon?: string };

const SectionContentManager = ({ kind }: { kind: SectionManagerKind }) => {
  const [content, setContent] = useState({ eyebrow: "", heading: "", description: "" });
  const [cards, setCards] = useState<ManagedCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingContent, setSavingContent] = useState(false);
  const [savingCard, setSavingCard] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [cardForm, setCardForm] = useState({ title: "", description: "", icon: "Sparkles" });
  const title = kind === "mindset" ? "Developer Mindset" : "My Vision";
  const endpoint = `/api/${kind}`;

  const load = async () => {
    setLoading(true);
    try {
      const response = await API.get(endpoint);
      const data = response.data ?? {};
      const section = data.content ?? data;
      setContent({
        eyebrow: section.eyebrow ?? section.subheading ?? "",
        heading: section.heading ?? section.title ?? "",
        description: section.description ?? "",
      });
      const returnedCards = Array.isArray(data.cards) ? data.cards : await API.get(`${endpoint}/cards`).then(r => r.data);
      setCards(Array.isArray(returnedCards) ? returnedCards : []);
    } catch (error: any) {
      console.error(`Failed to load ${title}:`, error);
      alert(error?.response?.data?.message || `Failed to load ${title}. Check the backend/API.`);
    } finally { setLoading(false); }
  };

  useEffect(() => { void load(); /* endpoint depends only on kind */ }, [endpoint]);

  const saveContent = async () => {
    setSavingContent(true);
    try {
      await API.put(endpoint, { eyebrow: content.eyebrow, heading: content.heading, description: content.description });
      alert(`${title} content saved successfully.`);
      await load();
    } catch (error: any) {
      console.error(`Failed to save ${title}:`, error);
      alert(error?.response?.data?.message || `Failed to save ${title} content.`);
    } finally { setSavingContent(false); }
  };

  const saveCard = async () => {
    if (!cardForm.title.trim() || !cardForm.description.trim()) {
      alert("Please enter both card title and description."); return;
    }
    setSavingCard(true);
    try {
      const payload = { title: cardForm.title.trim(), description: cardForm.description.trim(), icon: cardForm.icon };
      if (editingId !== null) await API.put(`${endpoint}/cards/${editingId}`, payload);
      else await API.post(`${endpoint}/cards`, payload);
      setCardForm({ title: "", description: "", icon: "Sparkles" });
      setEditingId(null);
      await load();
    } catch (error: any) {
      console.error(`Failed to save ${title} card:`, error);
      alert(error?.response?.data?.message || `Failed to save ${title} card.`);
    } finally { setSavingCard(false); }
  };

  const editCard = (card: ManagedCard) => {
    setEditingId(card.id);
    setCardForm({ title: card.title ?? "", description: card.description ?? "", icon: card.icon ?? "Sparkles" });
  };

  const removeCard = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this card?")) return;
    try { await API.delete(`${endpoint}/cards/${id}`); setCards(current => current.filter(card => card.id !== id)); }
    catch (error: any) { alert(error?.response?.data?.message || "Failed to delete card."); }
  };

  if (loading) return <div className="py-10 text-center text-sm text-zinc-400">Loading {title} content...</div>;
  const inputClass = "w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50";
  const labelClass = "mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400";
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
        <h3 className="mb-5 text-lg font-semibold text-white">Section Content</h3>
        <div className="grid gap-5">
          <label><span className={labelClass}>Eyebrow / Subheading</span><input className={inputClass} value={content.eyebrow} onChange={e => setContent(v => ({ ...v, eyebrow: e.target.value }))} placeholder={kind === "mindset" ? "Developer Mindset" : "My Vision"} /></label>
          <label><span className={labelClass}>Main Heading</span><input className={inputClass} value={content.heading} onChange={e => setContent(v => ({ ...v, heading: e.target.value }))} placeholder="Section heading" /></label>
          <label><span className={labelClass}>Description</span><textarea rows={4} className={inputClass} value={content.description} onChange={e => setContent(v => ({ ...v, description: e.target.value }))} placeholder="Section description" /></label>
          <div><button type="button" onClick={saveContent} disabled={savingContent} className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50"><Save size={16} />{savingContent ? "Saving..." : "Save Section Content"}</button></div>
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><h3 className="text-lg font-semibold text-white">{kind === "mindset" ? "Focus Cards" : "Vision Cards"}</h3><p className="mt-1 text-sm text-zinc-400">Add, edit, or delete cards shown on the public portfolio.</p></div><span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300">{cards.length} cards</span></div>
        <div className="mb-6 grid gap-4 lg:grid-cols-2">
          <label><span className={labelClass}>Card Title</span><input className={inputClass} value={cardForm.title} onChange={e => setCardForm(v => ({ ...v, title: e.target.value }))} placeholder="e.g. Clean Development" /></label>
          <label><span className={labelClass}>Icon Name</span><input className={inputClass} value={cardForm.icon} onChange={e => setCardForm(v => ({ ...v, icon: e.target.value }))} placeholder="Sparkles" /></label>
          <label className="lg:col-span-2"><span className={labelClass}>Card Description</span><textarea rows={3} className={inputClass} value={cardForm.description} onChange={e => setCardForm(v => ({ ...v, description: e.target.value }))} placeholder="Describe this card" /></label>
          <div className="flex flex-wrap gap-3 lg:col-span-2"><button type="button" onClick={saveCard} disabled={savingCard} className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400 disabled:opacity-50"><Save size={16} />{savingCard ? "Saving..." : editingId !== null ? "Update Card" : "Add Card"}</button>{editingId !== null && <button type="button" onClick={() => { setEditingId(null); setCardForm({ title: "", description: "", icon: "Sparkles" }); }} className="rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-200 hover:bg-white/5">Cancel Edit</button>}</div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">{cards.map(card => <div key={card.id} className="rounded-xl border border-white/10 bg-black/20 p-4"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><h4 className="font-semibold text-white">{card.title}</h4><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-zinc-400">{card.description}</p>{card.icon && <p className="mt-3 text-xs text-zinc-500">Icon: {card.icon}</p>}</div><div className="flex shrink-0 gap-2"><button type="button" title="Edit card" onClick={() => editCard(card)} className="rounded-lg border border-white/10 p-2 text-zinc-300 hover:bg-white/10"><Settings2 size={16} /></button><button type="button" title="Delete card" onClick={() => removeCard(card.id)} className="rounded-lg border border-red-500/20 p-2 text-red-300 hover:bg-red-500/10"><Trash2 size={16} /></button></div></div></div>)}{cards.length === 0 && <p className="text-sm text-zinc-500">No cards found. Add your first card above.</p>}</div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  // Desktop starts expanded; mobile starts with the drawer closed.
  const [sidebarOpen, setSidebarOpen] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 1024
  );

  // Keep the sidebar state appropriate when crossing the mobile breakpoint.
  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* CONTACTS */
  const [contacts, setContacts] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  /* HOME */

  const [home, setHome] = useState({
    heroTitle: "Hi, It's Nardev Rajput",

    heroRole: "I'm a Software Developer",

    heroImage: "",

    heroDescription:
      "Software Developer focused on building modern web applications, scalable backend systems, and practical software solutions.",

    aboutEyebrow: "About Me",

    aboutTitle: "Who I Am",

    aboutSubtitle: "Get to know the developer behind the code.",

    aboutHeading:
      "I am a Software Developer specializing in backend architecture, secure systems, and cross-platform application development.",

    aboutParagraph1:
      "My core expertise lies in Java and the Spring Boot ecosystem, where I focus on engineering robust, scalable, and high-security software solutions with strong backend architecture and optimized system performance.",

    aboutParagraph2:
      "I have worked on backend systems, AI Classification APIs, authentication architectures, and enterprise-style applications while contributing as a Software Developer at RCPL. My development work includes building applications for Android, Windows, and modern web platforms with a focus on performance, security, and maintainable architecture.",

    aboutParagraph3:
      "Alongside application development, I actively work on scalable APIs, secure backend systems, and intelligent software integrations using Java, Spring Boot, FastAPI, React.js, Node.js, MongoDB, and SQL.",

    aboutParagraph4:
      "Currently, I am deeply focused on System Design, AI/ML & Deep Learning, and Reverse Engineering to build more advanced, intelligent, and security-driven software systems.",

    aboutDescription: "",

    resumeUrl: "/resume.pdf",

    linkedin: "",

    github: "",

    instagram: "",
  });

  /* HOME IMAGE */
  const [selectedHeroFile, setSelectedHeroFile] = useState<File | null>(null);
  const [heroImageLoading, setHeroImageLoading] = useState(false);
  const [heroImageSaving, setHeroImageSaving] = useState(false);
  const [heroImageDeleting, setHeroImageDeleting] = useState(false);
  const [homeContentLoading, setHomeContentLoading] = useState(false);
  const [homeContentSaving, setHomeContentSaving] = useState(false);

  /* ABOUT CARDS API */
  const [aboutCards, setAboutCards] = useState<AboutCardItem[]>([]);
  const [aboutCardsLoading, setAboutCardsLoading] = useState(false);
  const [aboutCardSaving, setAboutCardSaving] = useState(false);
  const [editingAboutCardId, setEditingAboutCardId] = useState<number | null>(null);
  const [aboutCardForm, setAboutCardForm] = useState({ title: "", description: "", icon: "Brain" });

  // Load the saved Home page text content from the backend.
  const loadHomeContent = async () => {
    setHomeContentLoading(true);
    try {
      const response = await API.get("/api/home/content");
      const data = response.data;

      setHome((current) => ({
        ...current,
        heroTitle: data.heroTitle ?? current.heroTitle,
        heroRole: data.heroRole ?? current.heroRole,
        heroDescription: data.heroDescription ?? current.heroDescription,
        aboutEyebrow: data.aboutEyebrow ?? current.aboutEyebrow,
        aboutTitle: data.aboutTitle ?? current.aboutTitle,
        aboutSubtitle: data.aboutSubtitle ?? current.aboutSubtitle,
        aboutHeading: data.aboutHeading ?? current.aboutHeading,
        aboutParagraph1: data.aboutParagraph1 ?? current.aboutParagraph1,
        aboutParagraph2: data.aboutParagraph2 ?? current.aboutParagraph2,
        aboutParagraph3: data.aboutParagraph3 ?? current.aboutParagraph3,
        aboutParagraph4: data.aboutParagraph4 ?? current.aboutParagraph4,
        aboutDescription: data.aboutDescription ?? current.aboutDescription,
        resumeUrl: data.resumeUrl ?? current.resumeUrl,
        linkedin: data.linkedin ?? current.linkedin,
        github: data.github ?? current.github,
        instagram: data.instagram ?? current.instagram,
      }));
    } catch (error: any) {
      console.error("Failed to load Home Page content:", error);
      alert(
        error?.response?.data?.message ||
          "Failed to load Home Page content from the backend."
      );
    } finally {
      setHomeContentLoading(false);
    }
  };

  // Save Home page text content to the backend/MySQL.
  const saveHomeContent = async () => {
    if (!localStorage.getItem("token")) {
      alert("Please log in to the admin dashboard again.");
      return;
    }

    setHomeContentSaving(true);
    try {
      const payload = {
        heroTitle: home.heroTitle,
        heroRole: home.heroRole,
        heroDescription: home.heroDescription,
        aboutEyebrow: home.aboutEyebrow,
        aboutTitle: home.aboutTitle,
        aboutSubtitle: home.aboutSubtitle,
        aboutHeading: home.aboutHeading,
        aboutParagraph1: home.aboutParagraph1,
        aboutParagraph2: home.aboutParagraph2,
        aboutParagraph3: home.aboutParagraph3,
        aboutParagraph4: home.aboutParagraph4,
        // Keep the legacy field for compatibility with existing backend clients.
        aboutDescription: home.aboutDescription,
        resumeUrl: home.resumeUrl,
        linkedin: home.linkedin,
        github: home.github,
        instagram: home.instagram,
      };

      const response = await API.put("/api/home/content", payload);
      alert(response.data?.message || "Home Page content saved successfully.");
      await loadHomeContent();
    } catch (error: any) {
      console.error("Failed to save Home Page content:", error);
      alert(
        error?.response?.data?.message ||
          "Failed to save Home Page content. Check the backend and admin login."
      );
    } finally {
      setHomeContentSaving(false);
    }
  };

  // Load About cards from the backend/MySQL.
  const loadAboutCards = async () => {
    setAboutCardsLoading(true);
    try {
      const response = await API.get("/api/about-cards");
      setAboutCards(Array.isArray(response.data) ? response.data : []);
    } catch (error: any) {
      console.error("Failed to load About cards:", error);
      alert(error?.response?.data?.message || "Failed to load About cards.");
    } finally {
      setAboutCardsLoading(false);
    }
  };

  const saveAboutCard = async () => {
    if (!localStorage.getItem("token")) {
      alert("Please log in to the admin dashboard again.");
      return;
    }
    if (!aboutCardForm.title.trim()) {
      alert("Please enter a card title.");
      return;
    }

    setAboutCardSaving(true);
    try {
      const payload = {
        title: aboutCardForm.title.trim(),
        description: aboutCardForm.description.trim(),
        icon: aboutCardForm.icon.trim() || "Sparkles",
      };
      if (editingAboutCardId !== null) {
        await API.put(`/api/about-cards/${editingAboutCardId}`, payload);
        alert("About card updated successfully.");
      } else {
        await API.post("/api/about-cards", payload);
        alert("About card added successfully.");
      }
      setAboutCardForm({ title: "", description: "", icon: "Brain" });
      setEditingAboutCardId(null);
      await loadAboutCards();
    } catch (error: any) {
      console.error("Failed to save About card:", error);
      alert(error?.response?.data?.message || "Failed to save About card. Check backend and admin login.");
    } finally {
      setAboutCardSaving(false);
    }
  };

  const editAboutCard = (card: AboutCardItem) => {
    setEditingAboutCardId(card.id);
    setAboutCardForm({ title: card.title || "", description: card.description || "", icon: card.icon || "Sparkles" });
  };

  const deleteAboutCard = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this About card?")) return;
    if (!localStorage.getItem("token")) {
      alert("Please log in to the admin dashboard again.");
      return;
    }
    try {
      await API.delete(`/api/about-cards/${id}`);
      setAboutCards((current) => current.filter((card) => card.id !== id));
      if (editingAboutCardId === id) {
        setEditingAboutCardId(null);
        setAboutCardForm({ title: "", description: "", icon: "Brain" });
      }
      alert("About card deleted successfully.");
    } catch (error: any) {
      console.error("Failed to delete About card:", error);
      alert(error?.response?.data?.message || "Failed to delete About card.");
    }
  };

  // Load the saved Hero image from the backend.
  const loadHeroImage = async () => {
    setHeroImageLoading(true);

    try {
      const response = await API.get("/api/home/hero-image", {
        responseType: "blob",
        headers: { "Cache-Control": "no-cache" },
      });

      const previewUrl = URL.createObjectURL(response.data);
      setHome((current) => ({ ...current, heroImage: previewUrl }));
    } catch (error: any) {
      if (error?.response?.status === 404) {
        setHome((current) => ({ ...current, heroImage: "" }));
      } else {
        console.error("Failed to load Hero image:", error);
      }
    } finally {
      setHeroImageLoading(false);
    }
  };

  // Select and preview an image before saving it.
  const handleHomeImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    setSelectedHeroFile(file);
    const previewUrl = URL.createObjectURL(file);
    setHome((current) => ({ ...current, heroImage: previewUrl }));
  };

  // Save the selected image to the backend/MySQL.
  const saveHeroImage = async () => {
    if (!selectedHeroFile) {
      alert("Please select an image first.");
      return;
    }

    if (!localStorage.getItem("token")) {
      alert("Please log in to the admin dashboard again.");
      return;
    }

    setHeroImageSaving(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedHeroFile);

      const response = await API.put("/api/home/hero-image", formData);
      alert(response.data?.message || "Hero image saved successfully.");
      setSelectedHeroFile(null);
      await loadHeroImage();
    } catch (error: any) {
      console.error("Hero image upload failed:", error);
      alert(
        error?.response?.data?.message ||
          "Failed to save the image. Check backend status and admin login."
      );
    } finally {
      setHeroImageSaving(false);
    }
  };

  // Delete the saved image from the backend/MySQL.
  const removeHomeImage = async () => {
    if (!window.confirm("Are you sure you want to delete the saved Hero image?")) {
      return;
    }

    if (!localStorage.getItem("token")) {
      alert("Please log in to the admin dashboard again.");
      return;
    }

    setHeroImageDeleting(true);
    try {
      const response = await API.delete("/api/home/hero-image");
      setSelectedHeroFile(null);
      setHome((current) => ({ ...current, heroImage: "" }));
      alert(response.data?.message || "Hero image deleted successfully.");
    } catch (error: any) {
      console.error("Hero image deletion failed:", error);
      alert(
        error?.response?.data?.message ||
          "Failed to delete the image. Please check admin login and backend."
      );
    } finally {
      setHeroImageDeleting(false);
    }
  };

  /* CONTENT */

  const [education, setEducation] =
    useState<EducationItem[]>([]);
  const [educationLoading, setEducationLoading] = useState(false);
  const [educationSaving, setEducationSaving] = useState(false);

  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [experienceLoading, setExperienceLoading] = useState(false);
  const [experienceSaving, setExperienceSaving] = useState(false);

  const [skills, setSkills] = useState<SkillGroup[]>([]);
  const [skillsLoading, setSkillsLoading] = useState(false);
  const [skillSaving, setSkillSaving] = useState(false);
  const [skillContentSaving, setSkillContentSaving] = useState(false);
  const [skillContent, setSkillContent] = useState<SkillSectionContent>({
    heading: "My Tech Stack",
    subtitle: "Tools and technologies used to build modern applications.",
  });

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [serviceSaving, setServiceSaving] = useState(false);
  const [serviceContentSaving, setServiceContentSaving] = useState(false);
  const [serviceContent, setServiceContent] = useState<ServiceSectionContent>({
    heading: "What I Offer",
    subtitle: "Solutions I deliver to bring your ideas to life.",
  });

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectSaving, setProjectSaving] = useState(false);
  const [projectContentSaving, setProjectContentSaving] = useState(false);
  const [projectContent, setProjectContent] = useState<ProjectSectionContent>({
    eyebrow: "PORTFOLIO",
    heading: "Featured Projects",
    subtitle: "A selection of things I've designed and built.",
  });

  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [applicationSaving, setApplicationSaving] = useState(false);
  const [applicationSectionSaving, setApplicationSectionSaving] = useState(false);
  const [applicationSection, setApplicationSection] = useState<ApplicationSectionContent>({
    eyebrow: "APPLICATIONS",
    heading: "My Applications",
    subtitle: "Software applications and systems I have built or worked on.",
    sectionHeading: "Applications",
    sectionSubtitle: "Download my apps for Android and Windows",
  });

  /* =====================================================
     EDUCATION API
  ===================================================== */

  const loadEducation = async () => {
    setEducationLoading(true);
    try {
      const response = await API.get("/api/education");
      setEducation(Array.isArray(response.data) ? response.data : []);
    } catch (error: any) {
      console.error("Failed to load Education:", error);
      alert(error?.response?.data?.message || "Failed to load Education from the backend.");
    } finally {
      setEducationLoading(false);
    }
  };

  const saveEducation = async (
    form: Omit<EducationItem, "id">,
    editingId: number | null
  ) => {
    if (!localStorage.getItem("token")) {
      alert("Please log in to the admin dashboard again.");
      return false;
    }

    setEducationSaving(true);
    try {
      const payload = {
        degree: form.degree.trim(),
        year: form.year.trim(),
        institution: form.institution.trim(),
        location: form.location.trim(),
        description: form.description.trim(),
      };

      if (editingId !== null) {
        await API.put(`/api/education/${editingId}`, payload);
        alert("Education updated successfully.");
      } else {
        await API.post("/api/education", payload);
        alert("Education added successfully.");
      }

      await loadEducation();
      return true;
    } catch (error: any) {
      console.error("Failed to save Education:", error);
      alert(error?.response?.data?.message || "Failed to save Education. Check the backend and admin login.");
      return false;
    } finally {
      setEducationSaving(false);
    }
  };

  const removeEducation = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this education record?")) return;
    if (!localStorage.getItem("token")) {
      alert("Please log in to the admin dashboard again.");
      return;
    }

    try {
      await API.delete(`/api/education/${id}`);
      setEducation((current) => current.filter((item) => item.id !== id));
      alert("Education deleted successfully.");
    } catch (error: any) {
      console.error("Failed to delete Education:", error);
      alert(error?.response?.data?.message || "Failed to delete Education. Check the backend and admin login.");
    }
  };

  /* =====================================================
     EXPERIENCE API
  ===================================================== */

  // Backend stores responsibilities as newline-separated text.
  const normalizeExperience = (item: any): ExperienceItem => ({
    id: Number(item.id),
    role: item.role ?? "",
    company: item.company ?? "",
    period: item.period ?? "",
    description: Array.isArray(item.description)
      ? item.description
      : String(item.description ?? "")
          .split("\n")
          .map((point: string) => point.trim())
          .filter(Boolean),
  });

  const loadExperience = async () => {
    setExperienceLoading(true);
    try {
      const response = await API.get("/api/experience");
      setExperience(
        Array.isArray(response.data)
          ? response.data.map(normalizeExperience)
          : []
      );
    } catch (error: any) {
      console.error("Failed to load Experience:", error);
      alert(
        error?.response?.data?.message ||
          "Failed to load Experience from the backend."
      );
    } finally {
      setExperienceLoading(false);
    }
  };

  const saveExperience = async (
    form: Omit<ExperienceItem, "id">,
    editingId: number | null
  ) => {
    if (!localStorage.getItem("token")) {
      alert("Please log in to the admin dashboard again.");
      return false;
    }

    setExperienceSaving(true);
    try {
      const payload = {
        role: form.role.trim(),
        company: form.company.trim(),
        period: form.period.trim(),
        description: form.description
          .map((point) => point.trim())
          .filter(Boolean)
          .join("\n"),
      };

      if (editingId !== null) {
        await API.put(`/api/experience/${editingId}`, payload);
        alert("Experience updated successfully.");
      } else {
        await API.post("/api/experience", payload);
        alert("Experience added successfully.");
      }

      await loadExperience();
      return true;
    } catch (error: any) {
      console.error("Failed to save Experience:", error);
      alert(
        error?.response?.data?.message ||
          "Failed to save Experience. Check the backend and admin login."
      );
      return false;
    } finally {
      setExperienceSaving(false);
    }
  };

  const removeExperience = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this experience record?")) {
      return;
    }
    if (!localStorage.getItem("token")) {
      alert("Please log in to the admin dashboard again.");
      return;
    }

    try {
      await API.delete(`/api/experience/${id}`);
      setExperience((current) => current.filter((item) => item.id !== id));
      alert("Experience deleted successfully.");
    } catch (error: any) {
      console.error("Failed to delete Experience:", error);
      alert(
        error?.response?.data?.message ||
          "Failed to delete Experience. Check the backend and admin login."
      );
    }
  };

  /* =====================================================
     SKILLS API
  ===================================================== */

  const loadSkills = async () => {
    setSkillsLoading(true);
    try {
      const response = await API.get("/api/skills");
      setSkills(Array.isArray(response.data) ? response.data : []);
    } catch (error: any) {
      console.error("Failed to load Skills:", error);
      alert(error?.response?.data?.message || "Failed to load Skills from the backend.");
    } finally {
      setSkillsLoading(false);
    }
  };

  const loadSkillContent = async () => {
    try {
      const response = await API.get("/api/skills/content");
      setSkillContent({
        id: response.data?.id,
        heading: response.data?.heading ?? "My Tech Stack",
        subtitle: response.data?.subtitle ?? "Tools and technologies used to build modern applications.",
      });
    } catch (error: any) {
      console.error("Failed to load Skills section content:", error);
      alert(error?.response?.data?.message || "Failed to load Skills section content.");
    }
  };

  const saveSkillContent = async () => {
    if (!localStorage.getItem("token")) {
      alert("Please log in to the admin dashboard again.");
      return;
    }
    setSkillContentSaving(true);
    try {
      const payload = {
        heading: skillContent.heading.trim(),
        subtitle: skillContent.subtitle.trim(),
      };
      const response = await API.put("/api/skills/content", payload);
      setSkillContent((current) => ({ ...current, ...response.data, ...payload }));
      alert("Skills section heading and subtitle saved successfully.");
    } catch (error: any) {
      console.error("Failed to save Skills section content:", error);
      alert(error?.response?.data?.message || "Failed to save Skills section content. Check admin login and backend.");
    } finally {
      setSkillContentSaving(false);
    }
  };

  const saveSkillGroup = async (form: Omit<SkillGroup, "id">, editingId: number | null) => {
    if (!localStorage.getItem("token")) {
      alert("Please log in to the admin dashboard again.");
      return false;
    }
    if (!form.title.trim()) {
      alert("Enter category title.");
      return false;
    }
    setSkillSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        icon: form.icon.trim() || "DEV",
        skills: form.skills.map((skill) => skill.trim()).filter(Boolean),
      };
      if (editingId !== null) {
        await API.put(`/api/skills/${editingId}`, payload);
        alert("Skill group updated successfully.");
      } else {
        await API.post("/api/skills", payload);
        alert("Skill group added successfully.");
      }
      await loadSkills();
      return true;
    } catch (error: any) {
      console.error("Failed to save Skill group:", error);
      alert(error?.response?.data?.message || "Failed to save Skill group. Check backend and admin login.");
      return false;
    } finally {
      setSkillSaving(false);
    }
  };

  const deleteSkillGroup = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this skill group?")) return;
    if (!localStorage.getItem("token")) {
      alert("Please log in to the admin dashboard again.");
      return;
    }
    try {
      await API.delete(`/api/skills/${id}`);
      setSkills((current) => current.filter((item) => item.id !== id));
      alert("Skill group deleted successfully.");
    } catch (error: any) {
      console.error("Failed to delete Skill group:", error);
      alert(error?.response?.data?.message || "Failed to delete Skill group.");
    }
  };

  /* =====================================================
     SERVICES API
  ===================================================== */

  const loadServices = async () => {
    setServicesLoading(true);
    try {
      const response = await API.get("/api/services");
      setServices(Array.isArray(response.data) ? response.data : []);
    } catch (error: any) {
      console.error("Failed to load Services:", error);
      alert(error?.response?.data?.message || "Failed to load Services from the backend.");
    } finally {
      setServicesLoading(false);
    }
  };

  const loadServiceContent = async () => {
    try {
      const response = await API.get("/api/services/content");
      setServiceContent({
        id: response.data?.id,
        heading: response.data?.heading ?? "What I Offer",
        subtitle: response.data?.subtitle ?? "Solutions I deliver to bring your ideas to life.",
      });
    } catch (error: any) {
      console.error("Failed to load Services section content:", error);
      alert(error?.response?.data?.message || "Failed to load Services section content.");
    }
  };

  const saveServiceContent = async () => {
    if (!localStorage.getItem("token")) {
      alert("Please log in to the admin dashboard again.");
      return;
    }
    setServiceContentSaving(true);
    try {
      const payload = {
        heading: serviceContent.heading.trim(),
        subtitle: serviceContent.subtitle.trim(),
      };
      const response = await API.put("/api/services/content", payload);
      setServiceContent((current) => ({ ...current, ...response.data, ...payload }));
      alert("Services heading and subtitle saved successfully.");
    } catch (error: any) {
      console.error("Failed to save Services section content:", error);
      alert(error?.response?.data?.message || "Failed to save Services section content. Check admin login and backend.");
    } finally {
      setServiceContentSaving(false);
    }
  };

  const saveService = async (form: Omit<ServiceItem, "id">, editingId: number | null) => {
    if (!localStorage.getItem("token")) {
      alert("Please log in to the admin dashboard again.");
      return false;
    }
    if (!form.title.trim()) {
      alert("Enter service title.");
      return false;
    }
    setServiceSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        icon: form.icon.trim() || "Code",
      };
      if (editingId !== null) {
        await API.put(`/api/services/${editingId}`, payload);
        alert("Service updated successfully.");
      } else {
        await API.post("/api/services", payload);
        alert("Service added successfully.");
      }
      await loadServices();
      return true;
    } catch (error: any) {
      console.error("Failed to save Service:", error);
      alert(error?.response?.data?.message || "Failed to save Service. Check backend and admin login.");
      return false;
    } finally {
      setServiceSaving(false);
    }
  };

  const deleteService = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    if (!localStorage.getItem("token")) {
      alert("Please log in to the admin dashboard again.");
      return;
    }
    try {
      await API.delete(`/api/services/${id}`);
      setServices((current) => current.filter((item) => item.id !== id));
      alert("Service deleted successfully.");
    } catch (error: any) {
      console.error("Failed to delete Service:", error);
      alert(error?.response?.data?.message || "Failed to delete Service.");
    }
  };

  /* =====================================================
     PROJECTS API
  ===================================================== */

  const loadProjects = async () => {
    setProjectsLoading(true);
    try {
      const response = await API.get("/api/projects");
      setProjects(Array.isArray(response.data) ? response.data.map((item: any) => ({
        ...item,
        id: Number(item.id),
        progress: Number(item.progress ?? 0),
        tech: Array.isArray(item.tech) ? item.tech : [],
        features: Array.isArray(item.features) ? item.features : [],
        buttonText: item.buttonText ?? "View Code",
      })) : []);
    } catch (error: any) {
      console.error("Failed to load Projects:", error);
      alert(error?.response?.data?.message || "Failed to load Projects from the backend.");
    } finally {
      setProjectsLoading(false);
    }
  };

  const loadProjectContent = async () => {
    try {
      const response = await API.get("/api/projects/section");
      setProjectContent({
        id: response.data?.id,
        eyebrow: response.data?.eyebrow ?? "PORTFOLIO",
        heading: response.data?.heading ?? "Featured Projects",
        subtitle: response.data?.subtitle ?? "A selection of things I've designed and built.",
      });
    } catch (error: any) {
      console.error("Failed to load Projects section content:", error);
      alert(error?.response?.data?.message || "Failed to load Projects section content.");
    }
  };

  const saveProjectContent = async () => {
    if (!localStorage.getItem("token")) {
      alert("Please log in to the admin dashboard again.");
      return;
    }
    setProjectContentSaving(true);
    try {
      const payload = {
        eyebrow: projectContent.eyebrow.trim(),
        heading: projectContent.heading.trim(),
        subtitle: projectContent.subtitle.trim(),
      };
      const response = await API.put("/api/projects/section", payload);
      setProjectContent((current) => ({ ...current, ...response.data, ...payload }));
      alert("Projects section content saved successfully.");
    } catch (error: any) {
      console.error("Failed to save Projects section content:", error);
      alert(error?.response?.data?.message || "Failed to save Projects section content. Check admin login and backend.");
    } finally {
      setProjectContentSaving(false);
    }
  };

  const saveProject = async (form: Omit<ProjectItem, "id">, editingId: number | null) => {
    if (!localStorage.getItem("token")) {
      alert("Please log in to the admin dashboard again.");
      return false;
    }
    if (!form.title.trim()) {
      alert("Enter project name.");
      return false;
    }
    setProjectSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        category: form.category.trim(),
        status: form.status.trim(),
        description: form.description.trim(),
        progress: Math.max(0, Math.min(100, Number(form.progress) || 0)),
        tech: form.tech.map((value) => value.trim()).filter(Boolean),
        features: form.features.map((value) => value.trim()).filter(Boolean),
        github: form.github.trim(),
        buttonText: form.buttonText.trim() || "View Code",
      };
      if (editingId !== null) {
        await API.put(`/api/projects/${editingId}`, payload);
        alert("Project updated successfully.");
      } else {
        await API.post("/api/projects", payload);
        alert("Project added successfully.");
      }
      await loadProjects();
      return true;
    } catch (error: any) {
      console.error("Failed to save Project:", error);
      alert(error?.response?.data?.message || "Failed to save Project. Check backend and admin login.");
      return false;
    } finally {
      setProjectSaving(false);
    }
  };

  const deleteProject = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    if (!localStorage.getItem("token")) {
      alert("Please log in to the admin dashboard again.");
      return;
    }
    try {
      await API.delete(`/api/projects/${id}`);
      setProjects((current) => current.filter((item) => item.id !== id));
      alert("Project deleted successfully.");
    } catch (error: any) {
      console.error("Failed to delete Project:", error);
      alert(error?.response?.data?.message || "Failed to delete Project. Check backend and admin login.");
    }
  };

  /* =====================================================
     APPLICATIONS API
  ===================================================== */

  const loadApplications = async () => {
    setApplicationsLoading(true);
    try {
      const response = await API.get("/api/applications");
      setApplications(Array.isArray(response.data) ? response.data.map((item: any) => ({
        ...item,
        id: Number(item.id),
        platforms: Array.isArray(item.platforms) ? item.platforms : [],
        icon: item.icon ?? "",
        imageUrl: item.imageUrl ?? item.image ?? "",
      })) : []);
    } catch (error: any) {
      console.error("Failed to load Applications:", error);
      alert(error?.response?.data?.message || "Failed to load Applications from the backend.");
    } finally {
      setApplicationsLoading(false);
    }
  };

  const loadApplicationSection = async () => {
    try {
      const response = await API.get("/api/applications/section");
      const data = response.data ?? {};
      setApplicationSection((current) => ({
        id: data.id,
        eyebrow: data.eyebrow ?? current.eyebrow,
        heading: data.heading ?? current.heading,
        subtitle: data.subtitle ?? current.subtitle,
        sectionHeading: data.sectionHeading ?? current.sectionHeading,
        sectionSubtitle: data.sectionSubtitle ?? current.sectionSubtitle,
      }));
    } catch (error: any) {
      console.error("Failed to load Applications section content:", error);
      alert(error?.response?.data?.message || "Failed to load Applications section headings.");
    }
  };

  const saveApplicationSection = async () => {
    if (!localStorage.getItem("token")) {
      alert("Please log in to the admin dashboard again.");
      return;
    }
    setApplicationSectionSaving(true);
    try {
      const payload = {
        eyebrow: applicationSection.eyebrow.trim(),
        heading: applicationSection.heading.trim(),
        subtitle: applicationSection.subtitle.trim(),
        sectionHeading: applicationSection.sectionHeading.trim(),
        sectionSubtitle: applicationSection.sectionSubtitle.trim(),
      };
      const response = await API.put("/api/applications/section", payload);
      setApplicationSection((current) => ({ ...current, ...response.data, ...payload }));
      alert("Applications headings and descriptions saved successfully.");
    } catch (error: any) {
      console.error("Failed to save Applications section content:", error);
      alert(error?.response?.data?.message || "Failed to save Applications headings. Check backend and admin login.");
    } finally {
      setApplicationSectionSaving(false);
    }
  };

  const saveApplication = async (form: Omit<ApplicationItem, "id">, editingId: number | null) => {
    if (!localStorage.getItem("token")) {
      alert("Please log in to the admin dashboard again.");
      return false;
    }
    if (!form.title.trim()) {
      alert("Please enter an application name.");
      return false;
    }
    setApplicationSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        platforms: form.platforms,
        androidUrl: form.androidUrl.trim(),
        windowsUrl: form.windowsUrl.trim(),
        icon: form.icon?.trim() || "",
        imageUrl: form.imageUrl?.trim() || "",
      };
      if (editingId !== null) {
        await API.put(`/api/applications/${editingId}`, payload);
        alert("Application updated successfully.");
      } else {
        await API.post("/api/applications", payload);
        alert("Application added successfully.");
      }
      await loadApplications();
      return true;
    } catch (error: any) {
      console.error("Failed to save Application:", error);
      alert(error?.response?.data?.message || "Failed to save Application. Check backend and admin login.");
      return false;
    } finally {
      setApplicationSaving(false);
    }
  };

  const deleteApplication = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;
    if (!localStorage.getItem("token")) {
      alert("Please log in to the admin dashboard again.");
      return;
    }
    try {
      await API.delete(`/api/applications/${id}`);
      setApplications((current) => current.filter((item) => item.id !== id));
      alert("Application deleted successfully.");
    } catch (error: any) {
      console.error("Failed to delete Application:", error);
      alert(error?.response?.data?.message || "Failed to delete Application.");
    }
  };

  /* =====================================================
     CONTACT API
  ===================================================== */

  const fetchContacts = async () => {
    try {
      const data = await getContacts();

      setContacts(data);
    } catch (error) {
      console.log(error);

      alert("Failed to load contacts");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete =
      window.confirm("Delete this contact?");

    if (!confirmDelete) return;

    try {
      await deleteContact(id);

      setContacts((current) =>
        current.filter(
          (contact) => contact.id !== id
        )
      );
    } catch (error) {
      console.log(error);

      alert("Failed to delete contact");
    }
  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const logout = () => {
    localStorage.removeItem("token");

    window.location.href =
      "/admin/login";
  };

  /* =====================================================
     LOAD CONTACTS
  ===================================================== */

  useEffect(() => {
    fetchContacts();
    loadHeroImage();
    loadHomeContent();
    loadAboutCards();
    loadEducation();
    loadExperience();
    loadSkills();
    loadSkillContent();
    loadServices();
    loadServiceContent();
    loadProjects();
    loadProjectContent();
    loadApplications();
    loadApplicationSection();
    // Load saved Home content and Hero image once when the dashboard mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =====================================================
     FILTER CONTACTS
  ===================================================== */

  const filteredContacts = useMemo(() => {
    return contacts.filter(
      (contact) =>
        String(contact.name ?? "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        String(contact.email ?? "")
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [contacts, search]);

  /* =====================================================
     GENERIC DELETE
  ===================================================== */

  const deleteItem = (
    setter: React.Dispatch<
      React.SetStateAction<any[]>
    >,
    id: number
  ) => {
    setter((items) =>
      items.filter((item) => item.id !== id)
    );
  };

  /* =====================================================
     RENDER SECTION
  ===================================================== */

  const renderSection = () => {
    switch (activeTab) {
      /* =================================================
         HOME
      ================================================= */

      case "home":
        return (
          <SectionShell
            title="Home Page Content"
            description="Control your hero section, resume button, social links and About Me content."
            icon={UserRound}
          >
            <div className="grid gap-5 lg:grid-cols-2">

              <Field label="Hero Title">
                <input
                  className={fieldClass}
                  value={home.heroTitle}
                  onChange={(e) =>
                    setHome({
                      ...home,
                      heroTitle: e.target.value,
                    })
                  }
                />
              </Field>

              <Field label="Hero Role">
                <input
                  className={fieldClass}
                  value={home.heroRole}
                  onChange={(e) =>
                    setHome({
                      ...home,
                      heroRole: e.target.value,
                    })
                  }
                />
              </Field>

              <Field label="Resume URL">
                <input
                  className={fieldClass}
                  value={home.resumeUrl}
                  onChange={(e) =>
                    setHome({
                      ...home,
                      resumeUrl: e.target.value,
                    })
                  }
                  placeholder="/resume.pdf"
                />
              </Field>

              <Field label="LinkedIn URL">
                <input
                  className={fieldClass}
                  value={home.linkedin}
                  onChange={(e) =>
                    setHome({
                      ...home,
                      linkedin: e.target.value,
                    })
                  }
                />
              </Field>

              <Field label="GitHub URL">
                <input
                  className={fieldClass}
                  value={home.github}
                  onChange={(e) =>
                    setHome({
                      ...home,
                      github: e.target.value,
                    })
                  }
                />
              </Field>

              <Field label="Instagram URL">
                <input
                  className={fieldClass}
                  value={home.instagram}
                  onChange={(e) =>
                    setHome({
                      ...home,
                      instagram: e.target.value,
                    })
                  }
                />
              </Field>
            </div>

            {/* HOME / HERO IMAGE */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-orange-500/10 p-3 text-orange-400">
                  <ImageIcon size={20} />
                </div>

                <div>
                  <h3 className="font-bold">
                    Home Page Image
                  </h3>

                  <p className="text-xs text-zinc-500">
                    Select the image shown in your portfolio Home / Hero section.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-[220px_1fr] md:items-center">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                  {home.heroImage ? (
                    <img
                      src={home.heroImage}
                      alt="Home page preview"
                      className="h-52 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-52 items-center justify-center text-center text-xs text-zinc-600">
                      No image selected
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="home-hero-image"
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-400"
                  >
                    <ImageIcon size={17} />
                    {home.heroImage ? "Change Image" : "Choose Image"}
                  </label>

                  <input
                    id="home-hero-image"
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    className="hidden"
                    onChange={handleHomeImageChange}
                  />

                  {home.heroImage && (
                    <button
                      type="button"
                      onClick={removeHomeImage}
                      disabled={heroImageDeleting}
                      className="mt-3 w-full rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-3 text-sm font-bold text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {heroImageDeleting ? "Deleting..." : "Remove Saved Image"}
                    </button>
                  )}

                  <p className="mt-3 text-xs text-zinc-500">
                    {heroImageLoading
                      ? "Loading saved image..."
                      : selectedHeroFile
                        ? `Selected: ${selectedHeroFile.name}`
                        : "Choose an image, then save it to the database."}
                  </p>

                  <p className="mt-3 text-xs leading-5 text-zinc-600">
                    Supported: PNG, JPG, WEBP and GIF. The selected image is
                    previewed immediately in this dashboard.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <Field label="Hero Description">
                <textarea
                  className={`${fieldClass} min-h-28`}
                  value={home.heroDescription}
                  onChange={(e) =>
                    setHome({
                      ...home,
                      heroDescription: e.target.value,
                    })
                  }
                />
              </Field>
            </div>

            {/* ABOUT SECTION CONTENT */}
            <div className="mt-6 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-orange-500/15 p-3 text-orange-400">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-bold">About Section Content</h3>
                  <p className="text-xs text-zinc-500">
                    Edit the complete About section shown on your public portfolio.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Eyebrow Text">
                  <input
                    className={fieldClass}
                    value={home.aboutEyebrow}
                    onChange={(e) => setHome({ ...home, aboutEyebrow: e.target.value })}
                    placeholder="About Me"
                  />
                </Field>

                <Field label="Section Title">
                  <input
                    className={fieldClass}
                    value={home.aboutTitle}
                    onChange={(e) => setHome({ ...home, aboutTitle: e.target.value })}
                    placeholder="Who I Am"
                  />
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Section Subtitle">
                  <textarea
                    className={`${fieldClass} min-h-20`}
                    value={home.aboutSubtitle}
                    onChange={(e) => setHome({ ...home, aboutSubtitle: e.target.value })}
                    placeholder="Get to know the developer behind the code."
                  />
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Main About Heading">
                  <textarea
                    className={`${fieldClass} min-h-28`}
                    value={home.aboutHeading}
                    onChange={(e) => setHome({ ...home, aboutHeading: e.target.value })}
                    placeholder="I am a Software Developer specializing in..."
                  />
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Paragraph 1">
                  <textarea
                    className={`${fieldClass} min-h-28`}
                    value={home.aboutParagraph1}
                    onChange={(e) => setHome({ ...home, aboutParagraph1: e.target.value })}
                  />
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Paragraph 2">
                  <textarea
                    className={`${fieldClass} min-h-28`}
                    value={home.aboutParagraph2}
                    onChange={(e) => setHome({ ...home, aboutParagraph2: e.target.value })}
                  />
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Paragraph 3">
                  <textarea
                    className={`${fieldClass} min-h-28`}
                    value={home.aboutParagraph3}
                    onChange={(e) => setHome({ ...home, aboutParagraph3: e.target.value })}
                  />
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Paragraph 4">
                  <textarea
                    className={`${fieldClass} min-h-28`}
                    value={home.aboutParagraph4}
                    onChange={(e) => setHome({ ...home, aboutParagraph4: e.target.value })}
                  />
                </Field>
              </div>
            </div>

            {/* ABOUT CARDS MANAGER */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold">About Feature Cards</h3>
                  <p className="mt-1 text-xs text-zinc-500">Add, edit or delete the cards displayed in your About section.</p>
                </div>
                <button type="button" onClick={() => { setEditingAboutCardId(null); setAboutCardForm({ title: "", description: "", icon: "Brain" }); }} className="flex items-center gap-2 rounded-xl border border-orange-500/30 px-3 py-2 text-xs font-bold text-orange-400 hover:bg-orange-500/10">
                  <Plus size={15} /> New Card
                </button>
              </div>

              <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <h4 className="mb-4 text-sm font-bold">{editingAboutCardId !== null ? "Edit About Card" : "Add About Card"}</h4>
                  <Field label="Card Title">
                    <input className={fieldClass} value={aboutCardForm.title} onChange={(e) => setAboutCardForm((current) => ({ ...current, title: e.target.value }))} placeholder="Problem-Solving Mindset" />
                  </Field>
                  <div className="mt-4">
                    <Field label="Description">
                      <textarea className={`${fieldClass} min-h-24`} value={aboutCardForm.description} onChange={(e) => setAboutCardForm((current) => ({ ...current, description: e.target.value }))} placeholder="Describe this quality..." />
                    </Field>
                  </div>
                  <div className="mt-4">
                    <Field label="Lucide Icon Name">
                      <input className={fieldClass} value={aboutCardForm.icon} onChange={(e) => setAboutCardForm((current) => ({ ...current, icon: e.target.value }))} placeholder="Brain, Code2, Rocket, Sparkles" />
                    </Field>
                    <p className="mt-2 text-xs text-zinc-600">Use icon names such as Brain, Code2, Rocket or Sparkles.</p>
                  </div>
                  <div className="mt-5 flex gap-2">
                    <button type="button" onClick={saveAboutCard} disabled={aboutCardSaving} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white hover:bg-orange-400 disabled:opacity-50">
                      <Save size={16} /> {aboutCardSaving ? "Saving..." : editingAboutCardId !== null ? "Update Card" : "Add Card"}
                    </button>
                    {editingAboutCardId !== null && <button type="button" onClick={() => { setEditingAboutCardId(null); setAboutCardForm({ title: "", description: "", icon: "Brain" }); }} className="rounded-xl border border-white/10 px-3 text-sm text-zinc-400 hover:bg-white/5">Cancel</button>}
                  </div>
                </div>

                <div className="space-y-3">
                  {aboutCardsLoading ? (
                    <p className="rounded-xl border border-white/10 p-6 text-center text-sm text-zinc-500">Loading About cards...</p>
                  ) : aboutCards.length ? aboutCards.map((card) => (
                    <div key={card.id} className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h4 className="font-bold">{card.title}</h4>
                          <p className="mt-1 text-xs text-orange-400">Icon: {card.icon || "Sparkles"} · ID: {card.id}</p>
                        </div>
                        <div className="flex shrink-0 gap-2">
                          <button type="button" onClick={() => editAboutCard(card)} className="rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-zinc-300 hover:border-orange-500/30 hover:text-orange-400">Edit</button>
                          <button type="button" onClick={() => deleteAboutCard(card.id)} aria-label={`Delete ${card.title}`} className="rounded-lg border border-red-500/20 p-2 text-red-400 hover:bg-red-500/10"><Trash2 size={15} /></button>
                        </div>
                      </div>
                      <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-zinc-500">{card.description}</p>
                    </div>
                  )) : (
                    <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-sm text-zinc-500">No About cards found. Add your first card.</div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-orange-500/10 bg-orange-500/5 p-4">
              <p className="text-xs text-zinc-500">
                Save your text fields separately from the Hero image. Text content is stored through the Home Content API.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={saveHomeContent}
                  disabled={homeContentSaving || homeContentLoading}
                  className="flex items-center gap-2 rounded-xl border border-orange-500/30 bg-white/5 px-5 py-3 text-sm font-bold text-orange-400 transition hover:bg-orange-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Save size={17} />
                  {homeContentSaving
                    ? "Saving Content..."
                    : homeContentLoading
                      ? "Loading Content..."
                      : "Save Home Content"}
                </button>
                <button
                  type="button"
                  onClick={saveHeroImage}
                  disabled={!selectedHeroFile || heroImageSaving}
                  className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Save size={17} />
                  {heroImageSaving ? "Saving Image..." : "Save Hero Image"}
                </button>
              </div>
            </div>

          </SectionShell>
        );

      /* =================================================
         EDUCATION
      ================================================= */

      case "education":
        return (
          <SectionShell
            title="Education Manager"
            description="Add, edit and delete education cards."
            icon={GraduationCap}
          >
            <CrudEducation
              items={education}
              onSave={saveEducation}
              onDelete={removeEducation}
              loading={educationLoading}
              saving={educationSaving}
            />
          </SectionShell>
        );

      /* =================================================
         EXPERIENCE
      ================================================= */

      case "experience":
        return (
          <SectionShell
            title="Experience Manager"
            description="Manage your experience timeline."
            icon={BriefcaseBusiness}
          >
            <CrudExperience
              items={experience}
              onSave={saveExperience}
              onDelete={removeExperience}
              loading={experienceLoading}
              saving={experienceSaving}
            />
          </SectionShell>
        );

      /* =================================================
         SKILLS
      ================================================= */

      case "skills":
        return (
          <SectionShell
            title="Skills Manager"
            description="Manage the public Skills section heading, subtitle, categories and technologies."
            icon={Sparkles}
          >
            <div className="mb-7 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">
              <h3 className="mb-4 font-bold">Public Skills Section Content</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Section Heading">
                  <input className={fieldClass} value={skillContent.heading} onChange={(e) => setSkillContent((current) => ({ ...current, heading: e.target.value }))} placeholder="My Tech Stack" />
                </Field>
                <Field label="Section Subtitle">
                  <textarea className={`${fieldClass} min-h-20`} value={skillContent.subtitle} onChange={(e) => setSkillContent((current) => ({ ...current, subtitle: e.target.value }))} placeholder="Tools and technologies used to build modern applications." />
                </Field>
              </div>
              <div className="mt-4 flex justify-end">
                <button type="button" onClick={saveSkillContent} disabled={skillContentSaving} className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white hover:bg-orange-400 disabled:opacity-50">
                  <Save size={16} /> {skillContentSaving ? "Saving..." : "Save Heading & Subtitle"}
                </button>
              </div>
            </div>
            <CrudSkills items={skills} onSave={saveSkillGroup} onDelete={deleteSkillGroup} loading={skillsLoading} saving={skillSaving} />
          </SectionShell>
        );

      /* =================================================
         SERVICES
      ================================================= */

      case "services":
        return (
          <SectionShell
            title="Services Manager"
            description="Manage the public Services heading, subtitle and service cards."
            icon={Wrench}
          >
            <div className="mb-7 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">
              <h3 className="mb-4 font-bold">Public Services Section Content</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Section Heading">
                  <input
                    className={fieldClass}
                    value={serviceContent.heading}
                    onChange={(e) => setServiceContent((current) => ({ ...current, heading: e.target.value }))}
                    placeholder="What I Offer"
                  />
                </Field>
                <Field label="Section Subtitle">
                  <textarea
                    className={`${fieldClass} min-h-20`}
                    value={serviceContent.subtitle}
                    onChange={(e) => setServiceContent((current) => ({ ...current, subtitle: e.target.value }))}
                    placeholder="Solutions I deliver to bring your ideas to life."
                  />
                </Field>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={saveServiceContent}
                  disabled={serviceContentSaving}
                  className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white hover:bg-orange-400 disabled:opacity-50"
                >
                  <Save size={16} /> {serviceContentSaving ? "Saving..." : "Save Heading & Subtitle"}
                </button>
              </div>
            </div>
            <CrudServices
              items={services}
              onSave={saveService}
              onDelete={deleteService}
              loading={servicesLoading}
              saving={serviceSaving}
            />
          </SectionShell>
        );

      /* =================================================
         PROJECTS
      ================================================= */

      case "projects":
        return (
          <SectionShell
            title="Projects Manager"
            description="Add, edit and manage your featured projects."
            icon={FolderKanban}
          >
            <div className="mb-7 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">
              <h3 className="mb-4 font-bold">Public Projects Section Content</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Eyebrow Text">
                  <input className={fieldClass} value={projectContent.eyebrow} onChange={(e) => setProjectContent((current) => ({ ...current, eyebrow: e.target.value }))} placeholder="PORTFOLIO" />
                </Field>
                <Field label="Section Heading">
                  <input className={fieldClass} value={projectContent.heading} onChange={(e) => setProjectContent((current) => ({ ...current, heading: e.target.value }))} placeholder="Featured Projects" />
                </Field>
              </div>
              <div className="mt-4">
                <Field label="Section Subtitle">
                  <textarea className={`${fieldClass} min-h-20`} value={projectContent.subtitle} onChange={(e) => setProjectContent((current) => ({ ...current, subtitle: e.target.value }))} placeholder="A selection of things I've designed and built." />
                </Field>
              </div>
              <div className="mt-4 flex justify-end">
                <button type="button" onClick={saveProjectContent} disabled={projectContentSaving} className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white hover:bg-orange-400 disabled:opacity-50">
                  <Save size={16} /> {projectContentSaving ? "Saving..." : "Save Headings & Subtitle"}
                </button>
              </div>
            </div>
            <CrudProjects
              items={projects}
              onSave={saveProject}
              onDelete={deleteProject}
              loading={projectsLoading}
              saving={projectSaving}
            />
          </SectionShell>
        );

      /* =================================================
         APPLICATIONS
      ================================================= */

      case "applications":
        return (
          <SectionShell
            title="Applications Manager"
            description="Manage Android and Windows applications."
            icon={Activity}
          >
            <CrudApplications
              items={applications}
              loading={applicationsLoading}
              saving={applicationSaving}
              section={applicationSection}
              sectionSaving={applicationSectionSaving}
              onSectionChange={setApplicationSection}
              onSaveSection={saveApplicationSection}
              onSave={saveApplication}
              onDelete={deleteApplication}
            />
          </SectionShell>
        );

      /* =================================================
         DEVELOPER MINDSET
      ================================================= */

      case "mindset":
        return (
          <SectionShell
            title="Developer Mindset"
            description="Edit the section content and manage its focus cards."
            icon={Sparkles}
          >
            <SectionContentManager kind="mindset" />
          </SectionShell>
        );

      /* =================================================
         MY VISION
      ================================================= */

      case "vision":
        return (
          <SectionShell
            title="My Vision"
            description="Edit your vision section and manage its cards."
            icon={Activity}
          >
            <SectionContentManager kind="vision" />
          </SectionShell>
        );

      /* =================================================
         CONTACTS
      ================================================= */

      case "contacts":
        return (
          <SectionShell
            title="Contact Messages"
            description="Manage messages received through your portfolio."
            icon={Mail}
          >

            {/* SEARCH */}

            <div className="mb-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">

              <Search
                className="text-zinc-500"
                size={19}
              />

              <input
                className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-600"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              <span className="whitespace-nowrap rounded-lg bg-white/5 px-3 py-1 text-xs text-zinc-400">
                {filteredContacts.length} records
              </span>

            </div>

            {/* TABLE */}

            <div className="overflow-x-auto rounded-2xl border border-white/10">

              <table className="w-full min-w-[850px]">

                <thead className="bg-white/[0.03]">

                  <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-zinc-500">

                    <th className="px-4 py-4">
                      ID
                    </th>

                    <th className="px-4 py-4">
                      Name
                    </th>

                    <th className="px-4 py-4">
                      Email
                    </th>

                    <th className="px-4 py-4">
                      Message
                    </th>

                    <th className="px-4 py-4">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredContacts.map(
                    (contact) => (
                      <tr
                        key={contact.id}
                        className="border-b border-white/5 hover:bg-white/[0.02]"
                      >

                        <td className="px-4 py-4 text-zinc-500">
                          {contact.id}
                        </td>

                        <td className="px-4 py-4 font-semibold">
                          {contact.name}
                        </td>

                        <td className="px-4 py-4 text-zinc-400">
                          {contact.email}
                        </td>

                        <td className="max-w-md px-4 py-4 text-zinc-400">
                          {contact.message}
                        </td>

                        <td className="px-4 py-4">

                          <button
                            onClick={() =>
                              handleDelete(
                                contact.id
                              )
                            }
                            className="rounded-xl bg-red-500/10 p-3 text-red-400 transition hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 size={17} />
                          </button>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

              {!filteredContacts.length && (
                <div className="py-16 text-center text-sm text-zinc-600">
                  No contacts found.
                </div>
              )}

            </div>

          </SectionShell>
        );

      /* =================================================
         OVERVIEW
      ================================================= */

      default:
        return (
          <Overview
            contacts={contacts}
            counts={{
              education: education.length,
              experience: experience.length,
              skills: skills.length,
              services: services.length,
              projects: projects.length,
              applications: applications.length,
            }}
            onNavigate={setActiveTab}
          />
        );
    }
  };

  /* =====================================================
     MAIN UI
  ===================================================== */

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#070910] text-white">

      <div className="flex min-h-screen min-w-0">

        {/* Mobile backdrop: tap outside the drawer to close it. */}
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] lg:hidden"
          />
        )}

        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-[min(82vw,270px)] flex-col border-r border-white/10 bg-[#0a0d16]/95 shadow-2xl backdrop-blur-xl transition-all duration-300 lg:sticky lg:top-0 lg:z-40 lg:h-screen lg:w-[270px] lg:shrink-0 ${
            sidebarOpen
              ? "translate-x-0 lg:w-[270px]"
              : "-translate-x-full lg:w-20 lg:translate-x-0"
          }`}
        >

          {/* LOGO */}

          <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">

            <div
              className={`${
                !sidebarOpen
                  ? "lg:hidden"
                  : ""
              }`}
            >

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">
                Nardev
              </p>

              <h2 className="text-lg font-black">
                Admin Desk
              </h2>

            </div>

            <button
              onClick={() =>
                setSidebarOpen(
                  (value) => !value
                )
              }
              className="rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-400 hover:text-white"
            >

              <span className="lg:hidden">
                <X size={18} />
              </span>
              <span className="hidden lg:inline-flex">
                {sidebarOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
              </span>

            </button>

          </div>

          {/* NAV */}

          <div className="px-4 py-5">

            <div className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
              Content Management
            </div>

            <nav className="space-y-1">

              {navItems.map((item) => {

                const Icon = item.icon;

                const active =
                  activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    title={item.label}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${
                      active
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/10"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >

                    <Icon size={18} />

                    <span
                      className={`${
                        !sidebarOpen
                          ? "lg:hidden"
                          : ""
                      }`}
                    >
                      {item.label}
                    </span>

                  </button>
                );
              })}

            </nav>

          </div>

          {/* LOGOUT */}

          <div className="mt-auto border-t border-white/10 p-4">

            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
            >

              <LogOut size={18} />

              <span
                className={`${
                  !sidebarOpen
                    ? "lg:hidden"
                    : ""
                }`}
              >
                Logout
              </span>

            </button>

          </div>

        </aside>

        {/* =================================================
            MAIN
        ================================================= */}

        <main className="min-w-0 flex-1 overflow-x-hidden">

          {/* HEADER */}

          <header className="sticky top-0 z-30 flex h-16 min-w-0 items-center justify-between gap-3 border-b border-white/10 bg-[#070910]/90 px-3 backdrop-blur-xl sm:h-20 sm:px-5 lg:px-8">

            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={sidebarOpen}
                className="inline-flex shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2.5 text-zinc-300 transition hover:border-orange-500/40 hover:text-white lg:hidden"
              >
                <Menu size={20} />
              </button>
              <div className="min-w-0">

              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400">
                Portfolio CMS
              </p>

              <h1 className="truncate text-lg font-black sm:text-2xl">
                {
                  navItems.find(
                    (item) =>
                      item.id === activeTab
                  )?.label
                }
              </h1>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">

              <div className="hidden rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-right sm:block">

                <p className="text-xs font-bold">
                  Administrator
                </p>

                <p className="text-[10px] text-zinc-600">
                  JWT Protected
                </p>

              </div>

              <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-2 text-green-400">

                <ShieldCheck size={20} />

              </div>

            </div>

          </header>

          {/* CONTENT */}

          <div className="min-w-0 p-3 sm:p-5 lg:p-8">

            {renderSection()}

          </div>

        </main>

      </div>

    </div>
  );
};

/* =========================================================
   SECTION SHELL
========================================================= */

function SectionShell({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto w-full min-w-0 max-w-[1400px]">

      <div className="mb-7 flex flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.045] to-white/[0.015] p-6 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-orange-500/10 p-4 text-orange-400">
            <Icon size={25} />
          </div>

          <div>

            <h2 className="break-words text-xl font-black sm:text-3xl">
              {title}
            </h2>

            <p className="mt-1 max-w-3xl text-sm text-zinc-500">
              {description}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-2 rounded-xl border border-green-500/10 bg-green-500/5 px-3 py-2 text-xs text-green-400">

          <Check size={14} />

          Local editor ready

        </div>

      </div>

      <div className="min-w-0 rounded-2xl border border-white/10 bg-[#0b0f1b] p-3 shadow-2xl sm:rounded-3xl sm:p-5 md:p-7">

        {children}

      </div>

    </section>
  );
}

/* =========================================================
   FIELD
========================================================= */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>

      <label className={labelClass}>
        {label}
      </label>

      {children}

    </div>
  );
}

/* =========================================================
   SAVE BUTTON
========================================================= */

function LocalSave() {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-orange-500/10 bg-orange-500/5 p-4">

      <p className="text-xs text-zinc-500">
        UI-only for now. API will be connected later.
      </p>

      <button className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-400">

        <Save size={17} />

        Save Changes

      </button>

    </div>
  );
}

/* =========================================================
   OVERVIEW
========================================================= */

function Overview({
  contacts,
  counts,
  onNavigate,
}: {
  contacts: any[];
  counts: Record<string, number>;
  onNavigate: (tab: Tab) => void;
}) {

  const cards: {
    id: Tab;
    title: string;
    count: number;
    icon: React.ElementType;
    text: string;
  }[] = [

    {
      id: "home",
      title: "Home Content",
      count: 1,
      icon: UserRound,
      text: "Hero, image, resume, social links & About",
    },

    {
      id: "education",
      title: "Education",
      count: counts.education,
      icon: GraduationCap,
      text: "Education cards",
    },

    {
      id: "experience",
      title: "Experience",
      count: counts.experience,
      icon: BriefcaseBusiness,
      text: "Experience timeline",
    },

    {
      id: "skills",
      title: "Skills",
      count: counts.skills,
      icon: Sparkles,
      text: "Skill categories",
    },

    {
      id: "services",
      title: "Services",
      count: counts.services,
      icon: Wrench,
      text: "Service cards",
    },

    {
      id: "projects",
      title: "Projects",
      count: counts.projects,
      icon: FolderKanban,
      text: "Featured projects",
    },

    {
      id: "applications",
      title: "Applications",
      count: counts.applications,
      icon: Activity,
      text: "Downloadable apps",
    },

    {
      id: "contacts",
      title: "Contacts",
      count: contacts.length,
      icon: Mail,
      text: "Portfolio messages",
    },
  ];

  return (
    <section className="mx-auto w-full min-w-0 max-w-[1400px]">

      <div className="mb-7">

        <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
          Control Center
        </p>

        <h2 className="text-3xl font-black sm:text-5xl">
          Portfolio Dashboard
        </h2>

        <p className="mt-3 max-w-2xl text-zinc-500">
          Manage Home, Education, Experience, Skills,
          Services, Projects and Applications from one
          dashboard.
        </p>

      </div>

      {/* STATS */}

      <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <Stat
          title="Contacts"
          value={contacts.length}
          icon={Users}
        />

        <Stat
          title="Projects"
          value={counts.projects}
          icon={FolderKanban}
        />

        <Stat
          title="Applications"
          value={counts.applications}
          icon={Activity}
        />

        <Stat
          title="Content Sections"
          value={7}
          icon={Settings2}
        />

      </div>

      {/* MANAGEMENT CARDS */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        {cards.map((card) => {

          const Icon = card.icon;

          return (
            <button
              key={card.id}
              onClick={() =>
                onNavigate(card.id)
              }
              className="group rounded-3xl border border-white/10 bg-[#0b0f1b] p-5 text-left transition hover:-translate-y-1 hover:border-orange-500/30 hover:bg-[#0e1320]"
            >

              <div className="mb-7 flex items-center justify-between">

                <div className="rounded-2xl bg-orange-500/10 p-3 text-orange-400">

                  <Icon size={22} />

                </div>

                <span className="text-2xl font-black text-white">
                  {card.count}
                </span>

              </div>

              <h3 className="font-bold">
                {card.title}
              </h3>

              <p className="mt-1 text-xs text-zinc-600">
                {card.text}
              </p>

              <p className="mt-5 text-xs font-bold text-orange-400 opacity-0 transition group-hover:opacity-100">
                Manage section →
              </p>

            </button>
          );
        })}

      </div>

      {/* NOTICE */}

      <div className="mt-7 rounded-3xl border border-orange-500/10 bg-orange-500/5 p-5">

        <div className="flex gap-4">

          <ShieldCheck className="mt-1 shrink-0 text-orange-400" />

          <div>

            <h3 className="font-bold">
              Current mode: UI-only content editor
            </h3>

            <p className="mt-1 text-sm leading-6 text-zinc-500">
              Portfolio content changes currently stay
              in React state. Your existing Contacts API
              and JWT login/delete logic remain active.
              Backend API integration for the content
              sections can be added later.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

/* =========================================================
   STAT
========================================================= */

function Stat({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b0f1b] p-5">

      <div className="flex items-center justify-between">

        <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">

          <Icon size={20} />

        </div>

        <span className="text-3xl font-black">
          {value}
        </span>

      </div>

      <p className="mt-5 text-sm text-zinc-500">
        {title}
      </p>

    </div>
  );
}

/* =========================================================
   EDUCATION
========================================================= */

function CrudEducation({
  items,
  onSave,
  onDelete,
  loading,
  saving,
}: {
  items: EducationItem[];
  onSave: (form: Omit<EducationItem, "id">, editingId: number | null) => Promise<boolean>;
  onDelete: (id: number) => void;
  loading: boolean;
  saving: boolean;
}) {

  const empty = {
    degree: "",
    year: "",
    institution: "",
    location: "",
    description: "",
  };

  const [form, setForm] =
    useState(empty);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const submit = async () => {
    if (!form.degree.trim()) {
      alert("Enter degree / qualification");
      return;
    }
    if (!form.year.trim()) {
      alert("Enter education year");
      return;
    }
    if (!form.institution.trim()) {
      alert("Enter institution name");
      return;
    }

    const saved = await onSave(form, editingId);
    if (saved) {
      setForm(empty);
      setEditingId(null);
    }
  };

  const edit = (
    item: EducationItem
  ) => {

    setEditingId(item.id);

    setForm({
      degree: item.degree,
      year: item.year,
      institution: item.institution,
      location: item.location,
      description: item.description,
    });
  };

  return (
    <div className="grid gap-7 xl:grid-cols-[390px_1fr]">

      {/* FORM */}

      <EditorCard
        title={
          editingId
            ? "Edit Education"
            : "Add Education"
        }
        icon={GraduationCap}
      >

        <Field label="Degree / Qualification">

          <input
            className={fieldClass}
            value={form.degree}
            onChange={(e) =>
              setForm({
                ...form,
                degree: e.target.value,
              })
            }
            placeholder="B.Tech in Computer Science"
          />

        </Field>

        <div className="mt-4 grid grid-cols-2 gap-3">

          <Field label="Year">

            <input
              className={fieldClass}
              value={form.year}
              onChange={(e) =>
                setForm({
                  ...form,
                  year: e.target.value,
                })
              }
              placeholder="2026"
            />

          </Field>

          <Field label="Location">

            <input
              className={fieldClass}
              value={form.location}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: e.target.value,
                })
              }
              placeholder="India"
            />

          </Field>

        </div>

        <div className="mt-4">

          <Field label="Institution">

            <input
              className={fieldClass}
              value={form.institution}
              onChange={(e) =>
                setForm({
                  ...form,
                  institution:
                    e.target.value,
                })
              }
            />

          </Field>

        </div>

        <div className="mt-4">

          <Field label="Description">

            <textarea
              className={`${fieldClass} min-h-28`}
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description:
                    e.target.value,
                })
              }
            />

          </Field>

        </div>

        <EditorActions
          editing={!!editingId}
          onSave={submit}
          onCancel={() => {
            setForm(empty);
            setEditingId(null);
          }}
        />
        {saving && <p className="mt-3 text-center text-xs text-orange-400">Saving to database...</p>}

      </EditorCard>

      {/* LIST */}

      <div className="space-y-3">

        {loading && (
          <p className="rounded-xl border border-white/10 p-5 text-center text-sm text-zinc-500">
            Loading education records from the database...
          </p>
        )}

        {!loading && items.map((item) => (

          <ListCard
            key={item.id}
            title={item.degree}
            subtitle={`${item.institution} • ${item.year}`}
            icon={GraduationCap}
            onEdit={() => edit(item)}
            onDelete={() => onDelete(item.id)}
          >

            <p>
              {item.description}
            </p>

            <span className="mt-3 inline-flex rounded-lg bg-white/5 px-2 py-1 text-xs text-zinc-500">
              {item.location}
            </span>

          </ListCard>

        ))}

        {!items.length && (
          <EmptyState text="No education added." />
        )}

      </div>

    </div>
  );
}

/* =========================================================
   EXPERIENCE
========================================================= */

function CrudExperience({
  items,
  onSave,
  onDelete,
  loading,
  saving,
}: {
  items: ExperienceItem[];
  onSave: (
    form: Omit<ExperienceItem, "id">,
    editingId: number | null
  ) => Promise<boolean>;
  onDelete: (id: number) => void;
  loading: boolean;
  saving: boolean;
}) {
  const empty = {
    role: "",
    company: "",
    period: "",
    description: [""],
  };

  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<number | null>(null);

  const submit = async () => {
    if (!form.role.trim()) {
      alert("Enter role");
      return;
    }
    if (!form.company.trim()) {
      alert("Enter company or project");
      return;
    }
    if (!form.period.trim()) {
      alert("Enter experience period");
      return;
    }

    const clean = {
      ...form,
      description: form.description.map((point) => point.trim()).filter(Boolean),
    };

    const saved = await onSave(clean, editingId);
    if (saved) {
      setForm(empty);
      setEditingId(null);
    }
  };

  const edit = (item: ExperienceItem) => {
    setEditingId(item.id);
    setForm({
      role: item.role ?? "",
      company: item.company ?? "",
      period: item.period ?? "",
      description: item.description?.length ? item.description : [""],
    });
  };

  const updateBullet = (index: number, value: string) => {
    setForm((current) => ({
      ...current,
      description: current.description.map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  const cancelEdit = () => {
    setForm(empty);
    setEditingId(null);
  };

  return (
    <div className="grid gap-7 xl:grid-cols-[430px_1fr]">
      <EditorCard
        title={editingId !== null ? "Edit Experience" : "Add Experience"}
        icon={BriefcaseBusiness}
      >
        <Field label="Role">
          <input
            className={fieldClass}
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            placeholder="Software Developer"
          />
        </Field>

        <div className="mt-4">
          <Field label="Company / Project">
            <input
              className={fieldClass}
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="Company or project name"
            />
          </Field>
        </div>

        <div className="mt-4">
          <Field label="Period">
            <input
              className={fieldClass}
              value={form.period}
              onChange={(e) => setForm({ ...form, period: e.target.value })}
              placeholder="2025 – Present"
            />
          </Field>
        </div>

        <div className="mt-4">
          <Field label="Responsibilities">
            <div className="space-y-2">
              {form.description.map((bullet, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    className={fieldClass}
                    value={bullet}
                    onChange={(e) => updateBullet(index, e.target.value)}
                    placeholder={`Responsibility ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        description: current.description.filter((_, i) => i !== index),
                      }))
                    }
                    disabled={form.description.length === 1}
                    className="rounded-xl border border-red-500/20 px-3 text-red-400 hover:bg-red-500/10 disabled:opacity-40"
                    aria-label={`Remove responsibility ${index + 1}`}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setForm((current) => ({
                    ...current,
                    description: [...current.description, ""],
                  }))
                }
                className="flex items-center gap-2 text-xs font-bold text-orange-400"
              >
                <Plus size={15} />
                Add point
              </button>
            </div>
          </Field>
        </div>

        <EditorActions
          editing={editingId !== null}
          onSave={submit}
          onCancel={cancelEdit}
        />
      </EditorCard>

      <div className="space-y-3">
        {loading ? (
          <p className="rounded-xl border border-white/10 p-5 text-center text-sm text-zinc-500">
            Loading experience records from the database...
          </p>
        ) : items.length ? (
          items.map((item) => (
            <ListCard
              key={item.id}
              title={item.role}
              subtitle={`${item.company} • ${item.period}`}
              icon={BriefcaseBusiness}
              onEdit={() => edit(item)}
              onDelete={() => onDelete(item.id)}
            >
              {item.description.length ? (
                <ul className="space-y-2">
                  {item.description.map((point, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-orange-400">›</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No responsibilities added.</p>
              )}
            </ListCard>
          ))
        ) : (
          <EmptyState text="No experience records found. Add your first experience." />
        )}
      </div>
    </div>
  );
}

/* =========================================================
   SKILLS
========================================================= */

function CrudSkills({
  items,
  onSave,
  onDelete,
  loading,
  saving,
}: {
  items: SkillGroup[];
  onSave: (form: Omit<SkillGroup, "id">, editingId: number | null) => Promise<boolean>;
  onDelete: (id: number) => void;
  loading: boolean;
  saving: boolean;
}) {
  const empty = { title: "", icon: "DEV", skills: [] as string[] };
  const [form, setForm] = useState(empty);
  const [skillInput, setSkillInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const submit = async () => {
    if (!form.title.trim()) {
      alert("Enter category title");
      return;
    }
    const saved = await onSave(form, editingId);
    if (saved) {
      setForm(empty);
      setEditingId(null);
      setSkillInput("");
    }
  };

  const addSkill = () => {
    const value = skillInput.trim();
    if (!value || form.skills.some((skill) => skill.toLowerCase() === value.toLowerCase())) return;
    setForm((current) => ({ ...current, skills: [...current.skills, value] }));
    setSkillInput("");
  };

  const edit = (item: SkillGroup) => {
    setEditingId(item.id);
    setForm({ title: item.title ?? "", icon: item.icon ?? "DEV", skills: Array.isArray(item.skills) ? [...item.skills] : [] });
  };

  const cancelEdit = () => {
    setForm(empty);
    setEditingId(null);
    setSkillInput("");
  };

  return (
    <div className="grid gap-7 xl:grid-cols-[390px_1fr]">
      <EditorCard title={editingId !== null ? "Edit Skill Group" : "Add Skill Group"} icon={Sparkles}>
        <Field label="Category Title">
          <input className={fieldClass} value={form.title} onChange={(e) => setForm((current) => ({ ...current, title: e.target.value }))} placeholder="Programming Languages" />
        </Field>
        <div className="mt-4">
          <Field label="Icon Label">
            <input className={fieldClass} value={form.icon} onChange={(e) => setForm((current) => ({ ...current, icon: e.target.value }))} placeholder="DEV" />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Add Technology">
            <div className="flex gap-2">
              <input className={fieldClass} value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }} placeholder="Java, React, MySQL..." />
              <button type="button" onClick={addSkill} className="rounded-xl bg-orange-500 px-4 text-white"><Plus size={18} /></button>
            </div>
          </Field>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {form.skills.map((skill) => (
            <button type="button" key={skill} onClick={() => setForm((current) => ({ ...current, skills: current.skills.filter((item) => item !== skill) }))} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-300 hover:border-red-500/30" title={`Remove ${skill}`}>
              {skill} ×
            </button>
          ))}
        </div>
        <div className="mt-6 flex gap-2">
          <button type="button" onClick={submit} disabled={saving} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold hover:bg-orange-400 disabled:opacity-50">
            <Save size={16} /> {saving ? "Saving to database..." : editingId !== null ? "Update Skill Group" : "Add Skill Group"}
          </button>
          {editingId !== null && <button type="button" onClick={cancelEdit} className="rounded-xl border border-white/10 px-4 text-zinc-400 hover:bg-white/5">Cancel</button>}
        </div>
      </EditorCard>

      <div className="grid content-start gap-4 md:grid-cols-2">
        {loading ? (
          <p className="col-span-full rounded-xl border border-white/10 p-6 text-center text-sm text-zinc-500">Loading skill groups from database...</p>
        ) : items.length ? items.map((item) => (
          <ListCard key={item.id} title={item.title} subtitle={`${item.skills?.length ?? 0} technologies · ${item.icon || "DEV"}`} icon={Sparkles} onEdit={() => edit(item)} onDelete={() => onDelete(item.id)}>
            <div className="flex flex-wrap gap-2">
              {(item.skills ?? []).map((skill) => <span key={skill} className="rounded-lg bg-white/5 px-2.5 py-1.5 text-xs text-zinc-400">{skill}</span>)}
            </div>
          </ListCard>
        )) : (
          <div className="col-span-full"><EmptyState text="No skill groups found in the database. Add your first skill group using the form." /></div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   SERVICES
========================================================= */

function CrudServices({
  items,
  onSave,
  onDelete,
  loading,
  saving,
}: {
  items: ServiceItem[];
  onSave: (form: Omit<ServiceItem, "id">, editingId: number | null) => Promise<boolean>;
  onDelete: (id: number) => void;
  loading: boolean;
  saving: boolean;
}) {
  const empty = { title: "", description: "", icon: "Code" };
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<number | null>(null);

  const submit = async () => {
    if (!form.title.trim()) {
      alert("Enter service title.");
      return;
    }
    const saved = await onSave(form, editingId);
    if (saved) {
      setForm(empty);
      setEditingId(null);
    }
  };

  const edit = (item: ServiceItem) => {
    setEditingId(item.id);
    setForm({
      title: item.title ?? "",
      description: item.description ?? "",
      icon: item.icon ?? "Code",
    });
  };

  const cancelEdit = () => {
    setForm(empty);
    setEditingId(null);
  };

  return (
    <div className="grid gap-7 xl:grid-cols-[390px_1fr]">
      <EditorCard title={editingId !== null ? "Edit Service" : "Add Service"} icon={Wrench}>
        <Field label="Service Title">
          <input
            className={fieldClass}
            value={form.title}
            onChange={(e) => setForm((current) => ({ ...current, title: e.target.value }))}
            placeholder="Backend Development"
          />
        </Field>
        <div className="mt-4">
          <Field label="Icon Name">
            <input
              className={fieldClass}
              value={form.icon}
              onChange={(e) => setForm((current) => ({ ...current, icon: e.target.value }))}
              placeholder="Server"
            />
            <p className="mt-2 text-xs text-zinc-600">Enter a Lucide icon name, for example Code, Server, Globe or Monitor.</p>
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Description">
            <textarea
              className={`${fieldClass} min-h-32`}
              value={form.description}
              onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))}
              placeholder="Describe the service you offer..."
            />
          </Field>
        </div>
        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={submit}
            disabled={saving}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold hover:bg-orange-400 disabled:opacity-50"
          >
            <Save size={16} /> {saving ? "Saving to database..." : editingId !== null ? "Update Service" : "Add Service"}
          </button>
          {editingId !== null && (
            <button type="button" onClick={cancelEdit} className="rounded-xl border border-white/10 px-4 text-zinc-400 hover:bg-white/5">
              Cancel
            </button>
          )}
        </div>
      </EditorCard>

      <div className="grid content-start gap-4 md:grid-cols-2">
        {loading ? (
          <p className="col-span-full rounded-xl border border-white/10 p-6 text-center text-sm text-zinc-500">
            Loading services from database...
          </p>
        ) : items.length ? (
          items.map((item) => (
            <ListCard
              key={item.id}
              title={item.title}
              subtitle={`${item.icon || "Code"} · ID: ${item.id}`}
              icon={Wrench}
              onEdit={() => edit(item)}
              onDelete={() => onDelete(item.id)}
            >
              <p>{item.description}</p>
            </ListCard>
          ))
        ) : (
          <div className="col-span-full">
            <EmptyState text="No services found in the database. Add your first service using the form." />
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   PROJECTS
========================================================= */

function CrudProjects({
  items,
  onSave,
  onDelete,
  loading,
  saving,
}: {
  items: ProjectItem[];
  onSave: (form: Omit<ProjectItem, "id">, editingId: number | null) => Promise<boolean>;
  onDelete: (id: number) => void;
  loading: boolean;
  saving: boolean;
}) {
  const empty: Omit<ProjectItem, "id"> = {
    title: "",
    category: "Web App",
    status: "In Progress",
    description: "",
    progress: 0,
    tech: [],
    features: [],
    github: "",
    buttonText: "View Code",
  };
  const [form, setForm] = useState(empty);
  const [techInput, setTechInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const submit = async () => {
    if (!form.title.trim()) {
      alert("Enter project name.");
      return;
    }
    const saved = await onSave(form, editingId);
    if (saved) {
      setForm(empty);
      setTechInput("");
      setFeatureInput("");
      setEditingId(null);
    }
  };

  const edit = (item: ProjectItem) => {
    setEditingId(item.id);
    setForm({
      title: item.title ?? "",
      category: item.category ?? "Web App",
      status: item.status ?? "In Progress",
      description: item.description ?? "",
      progress: Number(item.progress ?? 0),
      tech: Array.isArray(item.tech) ? [...item.tech] : [],
      features: Array.isArray(item.features) ? [...item.features] : [],
      github: item.github ?? "",
      buttonText: item.buttonText ?? "View Code",
    });
  };

  const cancelEdit = () => {
    setForm(empty);
    setTechInput("");
    setFeatureInput("");
    setEditingId(null);
  };

  const addListValue = (field: "tech" | "features", value: string) => {
    const clean = value.trim();
    if (!clean || form[field].some((item) => item.toLowerCase() === clean.toLowerCase())) return;
    setForm((current) => ({ ...current, [field]: [...current[field], clean] }));
    if (field === "tech") setTechInput("");
    else setFeatureInput("");
  };

  return (
    <div className="grid gap-7 xl:grid-cols-[430px_1fr]">
      <EditorCard title={editingId !== null ? "Edit Project" : "Add Project"} icon={FolderKanban}>
        <Field label="Project Name">
          <input className={fieldClass} value={form.title} onChange={(e) => setForm((current) => ({ ...current, title: e.target.value }))} placeholder="SecureScan AI" />
        </Field>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Field label="Category">
            <input className={fieldClass} value={form.category} onChange={(e) => setForm((current) => ({ ...current, category: e.target.value }))} placeholder="Web App / AI / ML" />
          </Field>
          <Field label="Status">
            <select className={fieldClass} value={form.status} onChange={(e) => setForm((current) => ({ ...current, status: e.target.value }))}>
              <option className="bg-[#0b0f1b]" value="Research Phase">Research Phase</option>
              <option className="bg-[#0b0f1b]" value="In Progress">In Progress</option>
              <option className="bg-[#0b0f1b]" value="Completed">Completed</option>
              <option className="bg-[#0b0f1b]" value="Under Development">Under Development</option>
            </select>
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Description">
            <textarea className={`${fieldClass} min-h-28`} value={form.description} onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))} placeholder="Describe your project..." />
          </Field>
        </div>
        <div className="mt-4">
          <Field label={`Progress: ${form.progress}%`}>
            <input type="range" min="0" max="100" value={form.progress} onChange={(e) => setForm((current) => ({ ...current, progress: Number(e.target.value) }))} className="w-full accent-orange-500" />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Technologies">
            <div className="flex min-w-0 flex-col gap-2 sm:flex-row">
              <input className={fieldClass} value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addListValue("tech", techInput); } }} placeholder="React, Spring Boot..." />
              <button type="button" onClick={() => addListValue("tech", techInput)} className="rounded-xl bg-orange-500 px-4"><Plus size={18} /></button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {form.tech.map((technology) => <button type="button" key={technology} onClick={() => setForm((current) => ({ ...current, tech: current.tech.filter((item) => item !== technology) }))} className="rounded-lg bg-white/5 px-2.5 py-1.5 text-xs">{technology} ×</button>)}
            </div>
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Features">
            <div className="flex min-w-0 flex-col gap-2 sm:flex-row">
              <input className={fieldClass} value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addListValue("features", featureInput); } }} placeholder="JWT authentication, dashboard..." />
              <button type="button" onClick={() => addListValue("features", featureInput)} className="rounded-xl bg-orange-500 px-4"><Plus size={18} /></button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {form.features.map((feature) => <button type="button" key={feature} onClick={() => setForm((current) => ({ ...current, features: current.features.filter((item) => item !== feature) }))} className="rounded-lg bg-white/5 px-2.5 py-1.5 text-xs">{feature} ×</button>)}
            </div>
          </Field>
        </div>
        <div className="mt-4">
          <Field label="GitHub URL">
            <input className={fieldClass} value={form.github} onChange={(e) => setForm((current) => ({ ...current, github: e.target.value }))} placeholder="https://github.com/..." />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Button Text">
            <input className={fieldClass} value={form.buttonText} onChange={(e) => setForm((current) => ({ ...current, buttonText: e.target.value }))} placeholder="View Code" />
          </Field>
        </div>
        <div className="mt-6 flex gap-2">
          <button type="button" onClick={submit} disabled={saving} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold hover:bg-orange-400 disabled:opacity-50"><Save size={16} />{saving ? "Saving to database..." : editingId !== null ? "Update Project" : "Add Project"}</button>
          {editingId !== null && <button type="button" onClick={cancelEdit} className="rounded-xl border border-white/10 px-4 text-zinc-400 hover:bg-white/5">Cancel</button>}
        </div>
      </EditorCard>

      <div className="grid content-start gap-4">
        {loading ? <p className="rounded-xl border border-white/10 p-6 text-center text-sm text-zinc-500">Loading projects from database...</p> : items.length ? items.map((item) => (
          <ListCard key={item.id} title={item.title} subtitle={`${item.category} • ${item.status} • ${item.progress}%`} icon={FolderKanban} onEdit={() => edit(item)} onDelete={() => onDelete(item.id)}>
            <p>{item.description}</p>
            {!!item.tech?.length && <div className="mt-3 flex flex-wrap gap-2">{item.tech.map((technology) => <span key={technology} className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-zinc-400">{technology}</span>)}</div>}
            {!!item.features?.length && <ul className="mt-3 list-inside list-disc space-y-1">{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>}
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-orange-500" style={{ width: `${item.progress}%` }} /></div>
            {item.github && <a href={item.github} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs font-semibold text-orange-400 hover:underline">{item.buttonText || "View Code"} ↗</a>}
          </ListCard>
        )) : <EmptyState text="No projects found in the database. Add your first project using the form." />}
      </div>
    </div>
  );
}

/* =========================================================
   APPLICATIONS
========================================================= */

function CrudApplications({
  items,
  loading,
  saving,
  section,
  sectionSaving,
  onSectionChange,
  onSaveSection,
  onSave,
  onDelete,
}: {
  items: ApplicationItem[];
  loading: boolean;
  saving: boolean;
  section: ApplicationSectionContent;
  sectionSaving: boolean;
  onSectionChange: React.Dispatch<React.SetStateAction<ApplicationSectionContent>>;
  onSaveSection: () => void;
  onSave: (form: Omit<ApplicationItem, "id">, editingId: number | null) => Promise<boolean>;
  onDelete: (id: number) => void;
}) {
  const empty: Omit<ApplicationItem, "id"> = {
    title: "",
    description: "",
    platforms: ["Android", "Windows"],
    androidUrl: "",
    windowsUrl: "",
    icon: "",
    imageUrl: "",
  };
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [applicationSearch, setApplicationSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = useMemo(() => {
    const query = applicationSearch.trim().toLowerCase();
    if (!query) return [];
    return items
      .filter((item) => item.title.toLowerCase().includes(query))
      .slice(0, 6);
  }, [items, applicationSearch]);

  const filteredItems = useMemo(() => {
    const query = applicationSearch.trim().toLowerCase();
    if (!query) return items;
    return items.filter((item) =>
      `${item.title} ${item.description}`.toLowerCase().includes(query)
    );
  }, [items, applicationSearch]);

  const submit = async () => {
    if (!form.title.trim()) {
      alert("Enter application name.");
      return;
    }
    const saved = await onSave(form, editingId);
    if (saved) {
      setForm(empty);
      setEditingId(null);
    }
  };

  const edit = (item: ApplicationItem) => {
    setEditingId(item.id);
    setForm({
      title: item.title ?? "",
      description: item.description ?? "",
      platforms: Array.isArray(item.platforms) ? [...item.platforms] : [],
      androidUrl: item.androidUrl ?? "",
      windowsUrl: item.windowsUrl ?? "",
      icon: item.icon ?? "",
      imageUrl: item.imageUrl ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please choose a valid image file.");
      event.target.value = "";
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Please choose an image smaller than 2 MB.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setForm((current) => ({
      ...current,
      imageUrl: typeof reader.result === "string" ? reader.result : "",
    }));
    reader.onerror = () => alert("Could not read this image file.");
    reader.readAsDataURL(file);
  };

  const togglePlatform = (platform: string) => {
    setForm((current) => ({
      ...current,
      platforms: current.platforms.includes(platform)
        ? current.platforms.filter((item) => item !== platform)
        : [...current.platforms, platform],
    }));
  };

  return (
    <div className="space-y-7">
      <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">
        <div className="mb-5">
          <h3 className="text-lg font-bold">Public Applications Section Content</h3>
          <p className="mt-1 text-sm text-zinc-500">Edit all five headings and descriptions displayed on the public Applications page.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="1. Section Label / Eyebrow">
            <input className={fieldClass} value={section.eyebrow} onChange={(e) => onSectionChange((c) => ({ ...c, eyebrow: e.target.value }))} placeholder="APPLICATIONS" />
          </Field>
          <Field label="2. Main Heading">
            <input className={fieldClass} value={section.heading} onChange={(e) => onSectionChange((c) => ({ ...c, heading: e.target.value }))} placeholder="My Applications" />
          </Field>
          <Field label="3. Main Description">
            <textarea className={`${fieldClass} min-h-24`} value={section.subtitle} onChange={(e) => onSectionChange((c) => ({ ...c, subtitle: e.target.value }))} placeholder="Software applications and systems I have built or worked on." />
          </Field>
          <Field label="4. Cards Heading">
            <input className={fieldClass} value={section.sectionHeading} onChange={(e) => onSectionChange((c) => ({ ...c, sectionHeading: e.target.value }))} placeholder="Applications" />
          </Field>
          <div className="md:col-span-2">
            <Field label="5. Cards Description">
              <textarea className={`${fieldClass} min-h-20`} value={section.sectionSubtitle} onChange={(e) => onSectionChange((c) => ({ ...c, sectionSubtitle: e.target.value }))} placeholder="Download my apps for Android and Windows" />
            </Field>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button type="button" onClick={onSaveSection} disabled={sectionSaving} className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white hover:bg-orange-400 disabled:opacity-50">
            <Save size={16} /> {sectionSaving ? "Saving headings..." : "Save All Headings"}
          </button>
        </div>
      </div>

      <div className="grid gap-7 xl:grid-cols-[430px_1fr]">
        <EditorCard title={editingId !== null ? "Edit Application" : "Add Application"} icon={Activity}>
          <Field label="Application Name">
            <input className={fieldClass} value={form.title} onChange={(e) => setForm((c) => ({ ...c, title: e.target.value }))} placeholder="Smart PDF Manager" />
          </Field>
          <div className="mt-4">
            <Field label="Description">
              <textarea className={`${fieldClass} min-h-28`} value={form.description} onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))} placeholder="Describe what this application does..." />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Custom SVG Icon Code or Icon Name">
              <textarea className={`${fieldClass} min-h-28 font-mono text-xs`} value={form.icon ?? ""} onChange={(e) => setForm((c) => ({ ...c, icon: e.target.value }))} placeholder={'Paste your <svg ...>...</svg> code or enter a Lucide icon name such as FileText'} />
              <p className="mt-2 text-xs text-zinc-600">SVG code is saved as text. Your public Applications component must render SVG markup safely or use a supported icon-name renderer.</p>
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Application Card Image">
              {form.imageUrl && <img src={form.imageUrl} alt="Application preview" className="mb-3 h-36 w-full rounded-xl border border-white/10 bg-black/30 object-contain p-2" />}
              <input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml" onChange={handleImageFile} className="block w-full text-xs text-zinc-400 file:mr-3 file:rounded-lg file:border-0 file:bg-orange-500 file:px-3 file:py-2 file:font-bold file:text-white" />
              <input className={`${fieldClass} mt-3`} value={form.imageUrl ?? ""} onChange={(e) => setForm((c) => ({ ...c, imageUrl: e.target.value }))} placeholder="Or paste an image URL / data URL" />
              <button type="button" onClick={() => setForm((c) => ({ ...c, imageUrl: "" }))} className="mt-2 text-xs text-red-400 hover:underline">Remove image</button>
              <p className="mt-2 text-xs text-zinc-600">Upload is limited to 2 MB. The backend entity must include an imageUrl field large enough to store data URLs, or use a hosted image URL.</p>
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Android Download URL">
              <input className={fieldClass} value={form.androidUrl} onChange={(e) => setForm((c) => ({ ...c, androidUrl: e.target.value }))} placeholder="https://..." />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Windows Download URL">
              <input className={fieldClass} value={form.windowsUrl} onChange={(e) => setForm((c) => ({ ...c, windowsUrl: e.target.value }))} placeholder="https://..." />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Platforms">
              <div className="flex flex-wrap gap-2">
                {["Android", "Windows"].map((platform) => {
                  const active = form.platforms.includes(platform);
                  return <button type="button" key={platform} onClick={() => togglePlatform(platform)} className={`rounded-xl border px-4 py-2 text-sm ${active ? "border-orange-500 bg-orange-500/10 text-orange-400" : "border-white/10 text-zinc-500"}`}>{platform}</button>;
                })}
              </div>
            </Field>
          </div>
          <div className="mt-6 flex gap-2">
            <button type="button" onClick={submit} disabled={saving} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold hover:bg-orange-400 disabled:opacity-50">
              <Save size={16} /> {saving ? "Saving to database..." : editingId !== null ? "Update Application" : "Add Application"}
            </button>
            {editingId !== null && <button type="button" onClick={() => { setForm(empty); setEditingId(null); }} className="rounded-xl border border-white/10 px-4 text-zinc-400 hover:bg-white/5">Cancel</button>}
          </div>
        </EditorCard>

        <div className="min-w-0">
          <div className="relative mb-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
              <Search size={19} className="shrink-0 text-zinc-500" />
              <input className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-600" value={applicationSearch} onFocus={() => setShowSuggestions(true)} onChange={(e) => { setApplicationSearch(e.target.value); setShowSuggestions(true); }} onKeyDown={(e) => { if (e.key === "Enter" && suggestions.length) { setApplicationSearch(suggestions[0].title); setShowSuggestions(false); } if (e.key === "Escape") setShowSuggestions(false); }} placeholder="Search applications by name or description..." />
              {applicationSearch && <button type="button" onClick={() => { setApplicationSearch(""); setShowSuggestions(false); }} className="text-xs text-orange-400">Clear</button>}
              <span className="whitespace-nowrap rounded-lg bg-white/5 px-3 py-1 text-xs text-zinc-400">{filteredItems.length} apps</span>
            </div>
            {showSuggestions && applicationSearch.trim() && (
              <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#101522] shadow-xl">
                {suggestions.length ? suggestions.map((item) => (
                  <button type="button" key={item.id} onClick={() => { setApplicationSearch(item.title); setShowSuggestions(false); }} className="block w-full px-4 py-3 text-left text-sm hover:bg-white/5">
                    <span className="block font-semibold text-white">{item.title}</span>
                    <span className="mt-1 block truncate text-xs text-zinc-500">{item.description}</span>
                  </button>
                )) : <p className="px-4 py-3 text-sm text-zinc-500">No applications found.</p>}
              </div>
            )}
          </div>

          {loading ? (
            <p className="rounded-xl border border-white/10 p-6 text-center text-sm text-zinc-500">Loading applications from database...</p>
          ) : filteredItems.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredItems.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  {item.imageUrl && <img src={item.imageUrl} alt={`${item.title} icon`} className="mb-4 h-32 w-full rounded-xl bg-black/30 object-contain p-2" />}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="mt-1 text-xs text-orange-400">{item.platforms.join(" • ") || "No platform selected"} · ID: {item.id}</p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button type="button" onClick={() => edit(item)} className="rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-zinc-300 hover:border-orange-500/30 hover:text-orange-400">Edit</button>
                      <button type="button" onClick={() => onDelete(item.id)} aria-label={`Delete ${item.title}`} className="rounded-lg border border-red-500/20 p-2 text-red-400 hover:bg-red-500/10"><Trash2 size={15} /></button>
                    </div>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-zinc-500">{item.description}</p>
                  {item.icon && <p className="mt-3 truncate text-xs text-zinc-600">Custom icon configured</p>}
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text={applicationSearch.trim() ? "No applications found. Try another name or description." : "No applications found in the database. Add your first application using the form."} />
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   EDITOR CARD
========================================================= */

function EditorCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {

  return (
    <div className="h-fit min-w-0 rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">

      <div className="mb-5 flex items-center gap-3">

        <div className="rounded-xl bg-orange-500/10 p-2.5 text-orange-400">

          <Icon size={19} />

        </div>

        <h3 className="font-bold">
          {title}
        </h3>

      </div>

      {children}

    </div>
  );
}

/* =========================================================
   EDITOR ACTIONS
========================================================= */

function EditorActions({
  editing,
  onSave,
  onCancel,
}: {
  editing: boolean;
  onSave: () => void;
  onCancel: () => void;
}) {

  return (
    <div className="mt-6 flex gap-2">

      <button
        onClick={onSave}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold hover:bg-orange-400"
      >

        <Save size={16} />

        {editing
          ? "Update"
          : "Add"}

      </button>

      {editing && (

        <button
          onClick={onCancel}
          className="rounded-xl border border-white/10 px-4 text-zinc-400 hover:bg-white/5"
        >
          Cancel
        </button>

      )}

    </div>
  );
}

/* =========================================================
   LIST CARD
========================================================= */

function ListCard({
  title,
  subtitle,
  icon: Icon,
  children,
  onEdit,
  onDelete,
}: {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  children: React.ReactNode;
  onEdit: () => void;
  onDelete: () => void;
}) {

  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-white/15 sm:p-5">

      <div className="flex items-start justify-between gap-4">

        <div className="flex min-w-0 gap-3">

          <div className="shrink-0 rounded-xl bg-white/5 p-3 text-orange-400">

            <Icon size={18} />

          </div>

          <div className="min-w-0">

            <h3 className="font-bold">
              {title}
            </h3>

            <p className="mt-1 text-xs text-zinc-600">
              {subtitle}
            </p>

          </div>

        </div>

        <div className="flex shrink-0 gap-2">

          <button
            onClick={onEdit}
            className="rounded-xl border border-white/10 px-3 py-2 text-xs font-bold text-zinc-400 hover:border-orange-500/30 hover:text-orange-400"
          >
            Edit
          </button>

          <button
            onClick={onDelete}
            className="rounded-xl border border-red-500/10 p-2 text-red-400 hover:bg-red-500/10"
          >
            <Trash2 size={15} />
          </button>

        </div>

      </div>

      <div className="mt-4 text-sm leading-6 text-zinc-500">

        {children}

      </div>

    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  text,
}: {
  text: string;
}) {

  return (
    <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center text-sm text-zinc-600">

      {text}

    </div>
  );
}

export default Dashboard;