import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Zap, Link2, ArrowUpRight, Bot, Workflow, Database, Mail, X, BarChart3, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

import dailyEnergyPulseImg from "@/assets/daily-energy-pulse-newsletter.png";
import dailyEnergyWorkflow1 from "@/assets/daily-energy-pulse-workflow1.png";
import dailyEnergyWorkflow2 from "@/assets/daily-energy-pulse-workflow2.png";
import smartLeadClipperImg from "@/assets/smart-lead-clipper.png";
import smartLeadClipperWorkflow from "@/assets/smart-lead-clipper-workflow.png";
import strategicBenchmarkingDashboard from "@/assets/strategic-benchmarking-dashboard.png";
import strategicBenchmarkingData from "@/assets/strategic-benchmarking-data.png";
import strategicBenchmarkingWorkflow from "@/assets/strategic-benchmarking-workflow.png";

const projectIcons = [Zap, Link2, BarChart3];
const projectLinks = [
  { link: "https://tally.so/r/RGd78P", linkText: "Tally" },
  { link: null, linkText: null },
  { link: null, linkText: null },
];
const projectImages = [
  { main: dailyEnergyPulseImg, gallery: [dailyEnergyPulseImg, dailyEnergyWorkflow1, dailyEnergyWorkflow2] },
  { main: smartLeadClipperImg, gallery: [smartLeadClipperImg, smartLeadClipperWorkflow] },
  { main: strategicBenchmarkingDashboard, gallery: [strategicBenchmarkingDashboard, strategicBenchmarkingData, strategicBenchmarkingWorkflow] },
];
const projectGalleryAlts = [
  ["Vista previa de la newsletter Daily Energy Pulse", "Esquema de automatización en Make para Daily Energy Pulse", "Esquema de automatización en Make para Daily Energy Pulse"],
  ["Interfaz de la extensión Smart Lead Clipper", "Esquema de automatización en Make para Smart Lead Clipper"],
  ["Dashboard de análisis de datos en Power BI para Strategic Benchmarking", "Hoja de datos financieros consolidados en Google Sheets", "Esquema de automatización en Make para Strategic Benchmarking"],
];
const projectBadgeIcons: Record<string, typeof Workflow> = {
  Automation: Workflow, "AI Agents": Bot, Newsletter: Mail, CRM: Database, Analytics: TrendingUp,
};
const projectTechStacks = [
  ["Make", "OpenAI", "Tally", "Email API", "RSS Feeds"],
  ["Make", "Gemini AI", "LinkedIn", "Notion", "Chrome Extension"],
  ["Make", "Gemini AI", "OneDrive", "Google Sheets", "Power BI"],
];
const badgeKeys = [
  ["Automation", "AI Agents", "Newsletter"],
  ["CRM", "AI Agents", "Automation"],
  ["Automation", "AI Agents", "Analytics"],
];

// Render text with <tally> tags as clickable links and \n\n as paragraph breaks
const renderText = (text: string) => {
  const paragraphs = text.split(/\n\n/);
  return paragraphs.map((paragraph, pIdx) => {
    const parts = paragraph.split(/(<tally>.*?<\/tally>)/);
    const rendered = parts.map((part, i) => {
      const match = part.match(/<tally>(.*?)<\/tally>/);
      if (match) {
        return (
          <a key={i} href="https://tally.so/r/RGd78P" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline" onClick={(e) => e.stopPropagation()}>
            {match[1]}
          </a>
        );
      }
      return <span key={i}>{part}</span>;
    });
    return <p key={pIdx} className={pIdx < paragraphs.length - 1 ? "mb-3" : ""}>{rendered}</p>;
  });
};

export const Projects = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const projectItems = t("projects.items", { returnObjects: true }) as {
    title: string;
    description: string;
    deepDive: { heading: string; content: string }[];
  }[];

  return (
    <section id="projects" className="py-20">
      <div className="section-container" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="section-title text-primary text-xl">{t("projects.sectionLabel")}</h2>
          <p className="section-subtitle font-mono font-bold text-3xl text-secondary-foreground">{t("projects.sectionTitle")}</p>
          <p className="mt-4 text-foreground/70 text-base leading-relaxed">{t("projects.sectionDescription")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {projectItems.map((project, index) => {
            const Icon = projectIcons[index];
            const { link, linkText } = projectLinks[index];
            const { main: mainImage } = projectImages[index];
            const badges = badgeKeys[index];
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className="bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedProject(index)}
              >
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img src={mainImage} alt={project.title} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium">
                      {t("projects.deepDive")}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-soft">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-display font-bold">{project.title}</h3>
                  </div>
                  <p className="text-foreground/70 mb-6 leading-relaxed">{project.description}</p>
                  {link && (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-medium hover:underline group/link mb-6" onClick={(e) => e.stopPropagation()}>
                      {t("projects.viewOn")} {linkText}
                      <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {badges.map((badgeKey) => {
                      const BadgeIcon = projectBadgeIcons[badgeKey];
                      return (
                        <span key={badgeKey} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          <BadgeIcon className="w-3.5 h-3.5" />
                          {t(`projects.badges.${badgeKey}`)}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Deep Dive Panel */}
      <AnimatePresence>
        {selectedProject !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 z-50 h-full w-full sm:w-[520px] md:w-[600px] bg-background border-l border-border shadow-elevated overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="sticky top-4 float-right mr-4 z-10 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Close project details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 pt-6">
                <div className="flex items-center gap-4 mb-8 pr-12">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-soft shrink-0">
                    {(() => {
                      const IconComp = projectIcons[selectedProject];
                      return <IconComp className="w-7 h-7 text-primary-foreground" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-foreground">
                      {projectItems[selectedProject].title}
                    </h3>
                    {projectLinks[selectedProject].link && (
                      <a href={projectLinks[selectedProject].link!} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary font-medium text-sm hover:underline mt-1">
                        {t("projects.viewOn")} {projectLinks[selectedProject].linkText}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="space-y-6 mb-10">
                  {projectItems[selectedProject].deepDive.map((section, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.1 }}>
                      <h4 className="text-lg font-display font-semibold text-primary mb-2">{section.heading}</h4>
                      <p className="text-foreground/80 leading-relaxed">{renderText(section.content)}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-4 mb-10">
                  <h4 className="text-lg font-display font-semibold text-foreground">{t("projects.screenshotsTitle")}</h4>
                  {projectImages[selectedProject].gallery.map((img, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="rounded-2xl overflow-hidden border border-border shadow-soft">
                      <img src={img} alt={projectGalleryAlts[selectedProject]?.[i] || `${projectItems[selectedProject].title} screenshot ${i + 1}`} className="w-full h-auto object-contain bg-muted" />
                    </motion.div>
                  ))}
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-display font-semibold text-foreground mb-3">{t("projects.techStack")}</h4>
                  <div className="flex flex-wrap gap-2">
                    {projectTechStacks[selectedProject].map((tool) => (
                      <span key={tool} className="px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
