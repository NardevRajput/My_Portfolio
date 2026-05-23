import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

import {
  X,
  LayoutGrid,
  FileText,
  Cpu,
  ShieldCheck,
  User2,
  Music,
  Smartphone,
  LayoutTemplate,
} from "lucide-react";

interface ApplicationsModalProps {
  open: boolean;
  onClose: () => void;
}

const apps = [
  {
    title: "Smart PDF Manager",
    description:
      "Advanced PDF management tool for reading, merging, compressing and organizing PDFs.",
    icon: FileText,
    iconBg: "bg-card",
    iconColor: "text-red-500",
  },

  {
    title: "AI Classification API",
    description:
      "AI-powered classification API for intelligent predictions and data processing.",
    icon: Cpu,
    iconBg: "bg-card",
    iconColor: "text-blue-600",
  },

  {
    title: "SpringBoot JWT Auth API",
    description:
      "Secure authentication API using JWT with Spring Boot and best security practices.",
    icon: ShieldCheck,
    iconBg: "bg-card",
    iconColor: "text-green-600",
  },

  {
    title: "User Profile Management App",
    description:
      "Manage users, profiles and secure data with a modern and responsive interface.",
    icon: User2,
    iconBg: "bg-card",
    iconColor: "text-blue-500",
  },

  {
    title: "Sangeet",
    description:
      "Online music streaming app with a modern player and smooth experience.",
    icon: Music,
    iconBg: "bg-card",
    iconColor: "text-pink-500",
  },
];

const ApplicationsModal = ({ open, onClose }: ApplicationsModalProps) => {
  // BACKGROUND SCROLL LOCK
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[99999]

        bg-background/80
        backdrop-blur-xl

        flex
        items-start
        justify-center

        overflow-hidden
        overscroll-none

        p-0
        sm:p-5
      "
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      {/* MODAL */}
      <div
        className="
          relative
          bg-card
          overflow-hidden

          /* MOBILE */
          w-screen
          h-[100dvh]
          rounded-none
          border-0
          mt-2

          /* DESKTOP */
          sm:mt-0
          sm:w-full
          sm:max-w-[720px]
          sm:max-h-[92vh]
          sm:h-auto
          sm:rounded-[28px]
          sm:border
          sm:border-border
        "
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div
          className="
            sticky
            top-0
            z-50

            flex
            items-start
            justify-between
            gap-4

            px-4
            py-5

            sm:px-6

            border-b
            border-border

            bg-card
          "
        >
          {/* LEFT */}
          <div className="flex items-center gap-3 min-w-0">
            {/* ICON */}
            <div
              className="
                w-12
                h-12
                sm:w-14
                sm:h-14
                rounded-2xl
                bg-primary/10
                border
                border-primary/30
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <LayoutGrid className="w-6 h-6 text-primary" />
            </div>

            {/* TITLE */}
            <div className="min-w-0">
              <h2
                className="
                  text-2xl
                  sm:text-4xl
                  font-bold
                  text-foreground
                  leading-tight
                "
              >
                Applications
              </h2>

              <p
                className="
                  text-muted-foreground
                  text-xs
                  sm:text-sm
                  mt-1
                "
              >
                Download my apps for Android and Windows
              </p>
            </div>
          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="
              w-12
              h-12
              rounded-full
              border
              border-border
              flex
              items-center
              justify-center
              text-muted-foreground
              hover:bg-primary
              hover:text-primary-foreground
              transition-all
              duration-300
              shrink-0
            "
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* APP LIST */}
        <div
          className="
            overflow-y-auto
            overflow-x-hidden

            overscroll-contain

            h-[calc(100dvh-180px)]

            sm:max-h-[calc(92vh-100px)]

            p-4
            sm:p-6

            space-y-4
          "
        >
          {apps.map((app, index) => (
            <div
              key={index}
              className="
                border
                border-border
                rounded-2xl
                bg-background
                p-4
                sm:p-5
                transition-all
                duration-300
                hover:border-primary/40
                hover:bg-muted/30
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-5
                "
              >
                {/* TOP */}
                <div className="flex gap-4 min-w-0">
                  {/* ICON */}
                  <div
                    className={`
                      w-[72px]
                      h-[72px]
                      rounded-2xl
                      ${app.iconBg}
                      border
                      border-border
                      flex
                      items-center
                      justify-center
                      shrink-0
                    `}
                  >
                    <app.icon className={`w-8 h-8 ${app.iconColor}`} />
                  </div>

                  {/* INFO */}
                  <div className="min-w-0 flex-1">
                    <h3
                      className="
                        text-[28px]
                        leading-tight
                        font-bold
                        text-foreground
                        break-words
                      "
                    >
                      {app.title}
                    </h3>

                    <p
                      className="
                        text-muted-foreground
                        text-base
                        mt-3
                        leading-relaxed
                        break-words
                      "
                    >
                      {app.description}
                    </p>
                  </div>
                </div>

                {/* BUTTONS */}
                <div
                  className="
                    flex
                    flex-col
                    gap-3
                    w-full
                  "
                >
                  {/* ANDROID */}
                  <Button
                    className="
                      h-14
                      rounded-2xl
                      border
                      border-primary/40
                      bg-transparent
                      text-primary
                      hover:bg-primary
                      hover:text-primary-foreground
                      transition-all
                      duration-300
                      flex
                      items-center
                      justify-center
                      gap-3
                      w-full
                    "
                  >
                    <Smartphone className="w-5 h-5 shrink-0" />

                    <div className="flex flex-col leading-none text-left">
                      <span className="text-[10px] uppercase font-bold opacity-80">
                        Download
                      </span>

                      <span className="text-sm font-bold">Android</span>
                    </div>
                  </Button>

                  {/* WINDOWS */}
                  <Button
                    className="
                      h-14
                      rounded-2xl
                      border
                      border-primary/40
                      bg-transparent
                      text-primary
                      hover:bg-primary
                      hover:text-primary-foreground
                      transition-all
                      duration-300
                      flex
                      items-center
                      justify-center
                      gap-3
                      w-full
                    "
                  >
                    <LayoutTemplate className="w-5 h-5 shrink-0" />

                    <div className="flex flex-col leading-none text-left">
                      <span className="text-[10px] uppercase font-bold opacity-80">
                        Download
                      </span>

                      <span className="text-sm font-bold">Windows</span>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationsModal;
