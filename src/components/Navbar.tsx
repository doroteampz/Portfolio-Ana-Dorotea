import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslation } from "react-i18next";

type NavItem = {
  labelKey: string;
  href: string;
  children?: { labelKey: string; href: string }[];
};

const navItems: NavItem[] = [
  { labelKey: "nav.home", href: "#home" },
  { labelKey: "nav.about", href: "#about" },
  {
    labelKey: "nav.education",
    href: "#education",
    children: [{ labelKey: "nav.languages", href: "#languages" }],
  },
  {
    labelKey: "nav.experience",
    href: "#experience",
    children: [{ labelKey: "nav.upskilling", href: "#skills" }],
  },
  { labelKey: "nav.projects", href: "#projects" },
  { labelKey: "nav.contact", href: "#contact" },
];

const sectionIds = [
  "home", "about", "education", "languages", "experience", "skills", "projects", "contact",
];

const sectionToNav: Record<string, string> = {
  home: "#home", about: "#about", education: "#education", languages: "#education",
  experience: "#experience", skills: "#experience", projects: "#projects", contact: "#contact",
};

export const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const id = visible[0].target.id;
          setActiveSection(sectionToNav[id] || `#${id}`);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5] }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleDropdownEnter = (href: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(href);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const isActive = (item: NavItem) => {
    if (activeSection === item.href) return true;
    if (item.children?.some((c) => activeSection === c.href)) return true;
    return false;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-lg shadow-soft" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="font-display font-bold text-xl">
            A<span className="text-primary">D</span>M
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && handleDropdownEnter(item.href)}
                onMouseLeave={() => item.children && handleDropdownLeave()}
              >
                <a
                  href={item.href}
                  className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item)
                      ? "text-primary bg-primary/10"
                      : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {t(item.labelKey)}
                  {item.children && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        openDropdown === item.href ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </a>

                <AnimatePresence>
                  {item.children && openDropdown === item.href && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-1 z-50 min-w-[160px] rounded-xl bg-card border border-border shadow-elevated p-1.5"
                    >
                      {item.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeSection === child.href
                              ? "text-primary bg-primary/10"
                              : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                          }`}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {t(child.labelKey)}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <LanguageToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Close menu" : "Open menu"}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.href}>
                  <div className="flex items-center">
                    <a
                      href={item.href}
                      className={`flex-1 block text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                        isActive(item)
                          ? "text-primary bg-primary/10"
                          : "text-foreground/70 hover:text-primary"
                      }`}
                      onClick={() => { setIsOpen(false); setMobileExpanded(null); }}
                    >
                      {t(item.labelKey)}
                    </a>
                    {item.children && (
                      <button
                        className="p-2 text-foreground/50 hover:text-primary transition-colors"
                        onClick={() =>
                          setMobileExpanded(mobileExpanded === item.href ? null : item.href)
                        }
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            mobileExpanded === item.href ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  <AnimatePresence>
                    {item.children && mobileExpanded === item.href && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-6 space-y-1"
                      >
                        {item.children.map((child) => (
                          <a
                            key={child.href}
                            href={child.href}
                            className={`block text-sm py-2 px-3 rounded-lg transition-colors ${
                              activeSection === child.href
                                ? "text-primary bg-primary/10"
                                : "text-foreground/60 hover:text-primary"
                            }`}
                            onClick={() => { setIsOpen(false); setMobileExpanded(null); }}
                          >
                            {t(child.labelKey)}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
