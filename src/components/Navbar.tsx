import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import logo from "@/assets/logo.png";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/education", label: "Education" },
  { to: "/experience", label: "Experience" },
  { to: "/skills", label: "Skills" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/applications", label: "Applications" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  /* ================= SCROLL ================= */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* ================= THEME TOGGLE ================= */

  const toggleTheme = () => {
    setDarkMode((current) => {
      const next = !current;

      document.documentElement.classList.toggle("dark", next);

      return next;
    });
  };

  /* ================= DESKTOP NAV LINKS ================= */

  const desktopLinkClass =
    "relative px-3 py-2 text-md " +
    "text-gray-900 dark:text-gray-300 " +
    "hover:text-orange-500 dark:hover:text-orange-500 " +
    "transition-colors duration-300 rounded-md " +
    "after:absolute after:left-3 after:right-3 after:-bottom-1 " +
    "after:h-[2px] after:bg-orange-500 " +
    "after:scale-x-0 after:origin-center " +
    "after:transition-transform after:duration-300 " +
    "hover:after:scale-x-100";

  /* ================= MOBILE NAV LINKS ================= */

  const mobileLinkClass =
    "relative block px-3 py-3 text-base " +
    "text-gray-900 dark:text-gray-300 " +
    "hover:text-orange-500 dark:hover:text-orange-500 " +
    "transition-colors duration-300 rounded-md " +
    "after:absolute after:left-3 after:right-3 after:bottom-1 " +
    "after:h-[2px] after:bg-orange-500 " +
    "after:scale-x-0 after:origin-left " +
    "after:transition-transform after:duration-300 " +
    "hover:after:scale-x-100";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-card border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">

        {/* ================= LOGO ================= */}

        <NavLink
          to="/"
          className="flex items-center justify-center"
        >
          <div>
            <img
              src={logo}
              alt="Nardev Rajput logo"
              className="
                w-9 h-9
                ml-7
                bg-slate-800
                rounded-full
                object-cover
                border border-primary/30
                hover:scale-110
                transition-all
                duration-700
                shadow-[0_0_20px_hsl(var(--primary)/0.4)]
              "
            />

            <div className="text-[12px] font-display font-bold relative mt-0">
              <div>
                <span className="gradient-text">
                  Nardev
                </span>

                <span className="gradient-text ml-1">
                  Rajput
                </span>
              </div>
            </div>
          </div>
        </NavLink>

        {/* ================= DESKTOP NAV ================= */}

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={desktopLinkClass}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ================= RIGHT SIDE ================= */}

        <div className="flex items-center gap-3">

          {/* ================= THEME TOGGLE ================= */}

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="
              hidden lg:flex
              items-center
              justify-center
              w-12 h-12
              rounded-full
              border border-border/50
              bg-background/40
              backdrop-blur-md
              hover:border-orange-500
              hover:text-orange-500
              transition-all
              duration-300
            "
          >
            {darkMode ? (
              <Sun size={22} />
            ) : (
              <Moon size={22} />
            )}
          </button>

          {/* ================= MOBILE MENU BUTTON ================= */}

          <button
            aria-label="Toggle menu"
            className="
              lg:hidden
              text-gray-900
              dark:text-gray-100
              hover:text-orange-500
              transition-colors
              duration-300
            "
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}

      {open && (
        <div className="lg:hidden glass-card border-t border-border/50">
          <ul className="flex flex-col p-4 gap-2">

            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={() => setOpen(false)}
                  className={mobileLinkClass}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            {/* ================= MOBILE THEME TOGGLE ================= */}

            <li>
              <Button
                onClick={toggleTheme}
                className="
                  w-full
                  mt-2
                  bg-gradient-primary
                  flex
                  items-center
                  gap-2
                "
              >
                {darkMode ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}

                Toggle Theme
              </Button>
            </li>

          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;