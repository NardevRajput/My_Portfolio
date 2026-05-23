import {
  Heart,
  Shield,
  BadgeCheck,
  Lock,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  BriefcaseBusiness,
  Code2,
  Sparkles,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,115,0,0.08),transparent_45%)] pointer-events-none" />

      {/* TRUST BADGES */}
      <div className="container mx-auto px-4 pt-10 relative z-10">
        <TooltipProvider delayDuration={150}>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
            {/* VERIFIED */}
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-orange-500/40 bg-primary/10 text-sm text-foreground transition-all duration-300 hover:border-orange-500">
              <BadgeCheck className="h-4 w-4 text-orange-500" />

              <span className="font-medium">Verified Developer</span>
            </div>

            {/* SECURITY */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-orange-500/40 bg-primary/10 text-sm text-foreground transition-all duration-300 hover:border-orange-500 cursor-default">
                  <Shield className="h-4 w-4 text-orange-500" />

                  <Lock className="h-3.5 w-3.5 text-orange-500" />

                  <span className="font-medium">
                    Secure & Privacy First Software
                  </span>
                </div>
              </TooltipTrigger>

              <TooltipContent>
                Secure systems with modern architecture
              </TooltipContent>
            </Tooltip>

            {/* APPLICATIONS */}
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-orange-500/40 bg-primary/10 text-sm text-foreground transition-all duration-300 hover:border-orange-500">
              <Code2 className="h-4 w-4 text-orange-500" />

              <span className="font-medium">Cross-Platform Applications</span>
            </div>

            {/* AI */}
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-orange-500/40 bg-primary/10 text-sm text-foreground transition-all duration-300 hover:border-orange-500">
              <Sparkles className="h-4 w-4 text-orange-500" />

              <span className="font-medium">AI & Modern Backend Systems</span>
            </div>
          </div>
        </TooltipProvider>
      </div>

      {/* DIVIDER */}
      <div className="container mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* MAIN FOOTER */}
      <div className="container mx-auto px-4 py-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* ABOUT */}
          <div>
            <h3 className="text-foreground text-xl font-bold mb-4">
              Nardev Rajput
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Software Developer focused on scalable backend systems, AI-powered
              applications, secure APIs and modern cross-platform software
              solutions.
            </p>

            {/* SOCIALS */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://github.com/NardevRajput"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl border border-orange-500/30 flex items-center justify-center text-muted-foreground hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/nardev-rajput-813a83275/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl border border-orange-500/30 flex items-center justify-center text-muted-foreground hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-xl border border-orange-500/30 flex items-center justify-center text-muted-foreground hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-foreground text-lg font-semibold mb-4">
              Services
            </h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="hover:text-orange-400 transition-colors cursor-pointer">
                Backend Development
              </li>

              <li className="hover:text-orange-400 transition-colors cursor-pointer">
                Full Stack Web Applications
              </li>

              <li className="hover:text-orange-400 transition-colors cursor-pointer">
                Android & Windows Applications
              </li>

              <li className="hover:text-orange-400 transition-colors cursor-pointer">
                REST API Integration
              </li>

              <li className="hover:text-orange-400 transition-colors cursor-pointer">
                AI/ML Based Systems
              </li>
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-foreground text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="hover:text-orange-400 transition-colors cursor-pointer">
                About
              </li>

              <li className="hover:text-orange-400 transition-colors cursor-pointer">
                Skills
              </li>

              <li className="hover:text-orange-400 transition-colors cursor-pointer">
                Projects
              </li>

              <li className="hover:text-orange-400 transition-colors cursor-pointer">
                Applications
              </li>

              <li className="hover:text-orange-400 transition-colors cursor-pointer">
                Contact
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-foreground text-lg font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-orange-500 mt-1 shrink-0" />

                <span className="break-all">nardevrajput001@gmail.com</span>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-orange-500 mt-1 shrink-0" />

                <span>+91 9027050462</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-500 mt-1 shrink-0" />

                <span>Agra, Uttar Pradesh, India</span>
              </div>

              <div className="flex items-start gap-3">
                <BriefcaseBusiness className="w-4 h-4 text-orange-500 mt-1 shrink-0" />

                <span>Available for freelance & full-time opportunities</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col lg:flex-row items-center justify-between gap-5 text-sm text-muted-foreground">
          {/* LEFT */}
          <div className="text-center lg:text-left">
            <p>
              © {year}{" "}
              <span className="text-orange-400 font-semibold">
                Nardev Rajput
              </span>
              . All rights reserved.
            </p>

            <p className="text-xs mt-1 text-muted-foreground">
              Built with React, Tailwind CSS & Modern Backend Technologies.
            </p>
          </div>

          {/* CENTER */}
          <div className="flex flex-wrap items-center justify-center gap-5">
            <a href="#" className="hover:text-orange-400 transition-colors">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-orange-400 transition-colors">
              Terms of Service
            </a>

            <a href="#" className="hover:text-orange-400 transition-colors">
              Security
            </a>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 text-center">
            <Heart className="h-4 w-4 text-orange-500 fill-orange-500 shrink-0" />

            <span>Designed & Developed by Nardev Rajput</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
