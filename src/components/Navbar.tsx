import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);

    document.documentElement.classList.toggle("dark");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card border-b border-border/50" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo"
            className="w-11 h-11 rounded-full object-cover border border-primary/30 hover:scale-110 transition-all duration-300 shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
          />

          {/* <div className="text-2xl font-display font-bold">
    <span className="gradient-text">Nardev</span>
    <span className="text-foreground">.dev</span>
  </div> */}
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors rounded-md"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Toggle Theme Button */}
          <button
            onClick={toggleTheme}
            className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full border border-border/50 bg-background/40 backdrop-blur-md hover:border-primary hover:text-primary transition-all duration-300"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle menu"
            className="lg:hidden text-foreground"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden glass-card border-t border-border/50">
          <ul className="flex flex-col p-4 gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 text-base text-muted-foreground hover:text-primary transition-colors rounded-md"
                >
                  {l.label}
                </a>
              </li>
            ))}

            {/* Mobile Theme Toggle */}
            <li>
              <Button
                onClick={toggleTheme}
                className="w-full mt-2 bg-gradient-primary flex items-center gap-2"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
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
